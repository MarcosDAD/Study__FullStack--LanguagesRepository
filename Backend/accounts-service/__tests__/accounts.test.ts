import {jest, describe, expect, it, beforeAll, afterAll} from '@jest/globals';
import request from 'supertest';
import {Response} from 'express';
import {IAccount} from '../src/models/account';
import repository from '../src/models/accountRepository';
import app from '../src/app';
import auth from '../src/auth';


const plainPass = "abc123!@";
const hashPass = auth.hashPass(plainPass);
let jwt: string = '';
let testAccount : IAccount = {
    id: 0,
    username: "JestUser2",
    password: hashPass,
    email: "jest2@jest.com",
    native_language: "jestguese",
    status: 100
}

beforeAll(async () => {
    const account = await repository.newAccount(testAccount);
    jwt = auth.sign(account.id!);
    testAccount.id = account.id;
})

afterAll(async () => {
    await repository.removeAccountByEmail(testAccount.email);
    await repository.removeAccountByEmail("jest3@hotmail.com");
})

describe ('Testando rotas do accounts', () => {
    it('GET /accounts/ - É esperado Status 200', async () =>{
        const resultado = await request(app)
            .get('/accounts/')
            .set('x-access-token', jwt);
        
        expect(resultado.status).toEqual(200);
        expect(Array.isArray(resultado.body)).toBeTruthy();
    })
    
    it('POST /accounts/ - É esperado Status 201', async () =>{
        const payload = {
            username: 'JestUser3',
            email: 'jest3@hotmail.com',
            password: 'abc12!!',
            native_language: 'Jestguese'
        }

        const resultado = await request(app)
            .post('/accounts')
            .send(payload)

        expect(resultado.status).toEqual(201)
        expect(resultado.body.id).toBeTruthy();
    })
    
    it('POST /accounts/ - É esperado Status 422', async () =>{
        const payload = {
            job: 'Backend Developer'
        }

        const resultado = await request(app)
            .post('/accounts')
            .send(payload)

        expect(resultado.status).toEqual(422)
    })
    
    it('PATCH /accounts/:id - É esperado Status 200', async () =>{
        const payload = {
            username: 'Marcos Diniz'
        }

        const resultado = await request(app)
            .patch('/accounts/' + testAccount.id)
            .send(payload)
            .set('x-access-token', jwt);

        expect(resultado.status).toEqual(200)
        expect(resultado.body.username).toBe(payload.username)
        expect(resultado.body.id).toBe(testAccount.id)
    })
    
    it('PATCH /accounts/:id - É esperado Status 400', async () =>{
        const payload = {
            username: 'Marcos Diniz'
        }

        const resultado = await request(app)
            .patch('/accounts/abc')
            .send(payload)
            .set('x-access-token', jwt);

        expect(resultado.status).toEqual(400)
    })
    
    it('PATCH /accounts/:id - É esperado Status 404', async () =>{
        const payload = {
            username: 'Marcos Diniz'
        }

        const resultado = await request(app)
            .patch('/accounts/-1')
            .send(payload)
            .set('x-access-token', jwt);

        expect(resultado.status).toEqual(404)
    })
    
    it('GET /accounts/:id - É esperado Status 200', async () =>{
        const resultado = await request(app)
            .get('/accounts/'+testAccount.id)
            .set('x-access-token', jwt);
        
        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toBe(testAccount.id);
    })
    
    it('GET /accounts/:id - É esperado Status 404', async () =>{
        const resultado = await request(app)
            .get('/accounts/-1')
            .set('x-access-token', jwt);
        
        expect(resultado.status).toEqual(404);
    })
    
    it('GET /accounts/:id - É esperado Status 400', async () =>{
        const resultado = await request(app)
            .get('/accounts/abc')
            .set('x-access-token', jwt);
        
        expect(resultado.status).toEqual(400);
    })
})