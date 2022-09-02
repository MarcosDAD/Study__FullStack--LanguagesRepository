import {jest, describe, expect, it, beforeAll, afterAll} from '@jest/globals';
import request from 'supertest';
import {Response} from 'express';
import {ILanguage} from '../src/models/language';
import repository from '../src/models/languageRepository';
import app from '../src/app';
import accountsApp from '../../accounts-service/src/app';

const plainPass = "abc123!@";
//const hashPass = auth.hashPass(plainPass);
let jwt: string = '';
let testAccount = {
    username: "JestUser2",
    password: plainPass,
    email: "jest2@jest.com",
    native_language: "jestguese",
}
let testAccountId = 0;

beforeAll(async () => {
    const account = await request(accountsApp)
        .post('/accounts/')
        .send(testAccount);
    
    testAccountId = account.body.id;
    //testAccountId = 126;
    const result = await request(accountsApp)
        .post('/accounts/login')
        .send({
            email: testAccount.email,
            password: plainPass
        });
    jwt = result.body.token;
})

afterAll(async () => {
    await request(accountsApp)
        .post('/accounts/logout');
    
    await request(accountsApp)
        .delete('/accounts/' + testAccountId)
        .set('x-access-token', jwt);;
})

describe ('Testando rotas do accounts', () => {
    it('GET /languages/ - É esperado Status 200', async () =>{
        const resultado = await request(app)
            .get('/languages/')
            .set('x-access-token', jwt);
        
        expect(resultado.status).toEqual(200);
        expect(Array.isArray(resultado.body)).toBeTruthy();
    })

})