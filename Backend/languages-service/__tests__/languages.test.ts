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
let testLanguagesId = 0;
let testLanguagesLocalLabel = "";

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

    let testLanguage = {
        label: "Japanese",
        proficiency: 10,
        studying: true
    } as ILanguage;
    const result2 = await repository.addLanguage(testLanguage, testAccountId);
    testLanguagesId = result2.id!;
})

afterAll(async () => {
    //await repository.removeLanguage(testLanguagesId, testAccountId);
    await request(app)
            .delete('/languages/'+testLanguagesId)
            .set('x-access-token', jwt);

    await request(accountsApp)
        .delete('/accounts/' + testAccountId)
        .set('x-access-token', jwt);
    
    await request(accountsApp)
        .post('/accounts/logout');
})

describe ('Testando rotas do accounts', () => {
    it('GET /languages/ - É esperado Status 200', async () =>{
        const resultado = await request(app)
            .get('/languages/')
            .set('x-access-token', jwt);
        
        expect(resultado.status).toEqual(200);
        expect(Array.isArray(resultado.body)).toBeTruthy();
    })

    it('GET /languages/ - É esperado Status 401', async () =>{
        const resultado = await request(app)
            .get('/languages/')
        
        expect(resultado.status).toEqual(401);
    })

    it('GET /languages/:id - É esperado Status 200', async () =>{
        const resultado = await request(app)
            .get('/languages/'+testLanguagesId)
            .set('x-access-token', jwt);
        
        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toBeTruthy();
    })

    it('GET /languages/:label - É esperado Status 200', async () =>{
        const resultado = await request(app)
            .get('/languages/Japanese')
            .set('x-access-token', jwt);
        
        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toBeTruthy();
    })

    it('GET /languages/:id - É esperado Status 404', async () =>{
        const resultado = await request(app)
            .get('/languages/1')
            .set('x-access-token', jwt);
        
        expect(resultado.status).toEqual(404);
    })


    it('GET /languages/:id - É esperado Status 401', async () =>{
        const resultado = await request(app)
            .get('/languages/'+testLanguagesId)
        
        expect(resultado.status).toEqual(401);
    })

    it('GET /languages/:id - É esperado Status 404', async () =>{
        const resultado = await request(app)
            .get('/languages/abc')
            .set('x-access-token', jwt);
        
        expect(resultado.status).toEqual(404);
    })

    it('Post /languages/ - É esperado Status 201', async () =>{
        let testLanguageLocal = {
            label: "Spanish",
            proficiency: 20,
            studying: true
        } as ILanguage;
        //const resultLocal = await repository.addLanguage(testLanguageLocal, testAccountId);
        //let testLanguagesLocalId = resultLocal.id!;

        const resultado = await request(app)
            .post('/languages/')
            .set('x-access-token', jwt)
            .send(testLanguageLocal);
        
        testLanguagesLocalLabel = resultado.body.label;
        expect(resultado.status).toEqual(201);
        expect(resultado.body.id).toBeTruthy();
    })

    it('Post /languages/ - É esperado Status 400', async () =>{
        let testLanguageLocal = {
            label: "Spanish",
            proficiency: 30,
            studying: false
        } as ILanguage;
        //const resultLocal = await repository.addLanguage(testLanguageLocal, testAccountId);
        //let testLanguagesLocalId = resultLocal.id!;

        const resultado = await request(app)
            .post('/languages/')
            .set('x-access-token', jwt)
            .send(testLanguageLocal);
        
        
        expect(resultado.status).toEqual(400);
    })

    it('Post /languages/ - É esperado Status 422', async () =>{
        let testLanguageLocal = {
            street: "Test"
        };
        //const resultLocal = await repository.addLanguage(testLanguageLocal, testAccountId);
        //let testLanguagesLocalId = resultLocal.id!;

        const resultado = await request(app)
            .post('/languages/')
            .set('x-access-token', jwt)
            .send(testLanguageLocal);
        
        expect(resultado.status).toEqual(422);
    })

    it('Delete /languages/:label - É esperado Status 200', async () =>{
        const resultado = await request(app)
            .delete('/languages/'+testLanguagesLocalLabel)
            .set('x-access-token', jwt);
        
        expect(resultado.status).toEqual(200);
    })

    it('Delete /languages/:label - É esperado Status 404', async () =>{
        const resultado = await request(app)
            .delete('/languages/'+testLanguagesLocalLabel)
            .set('x-access-token', jwt);
        
        expect(resultado.status).toEqual(404);
    })

    it('Delete /languages/:label - É esperado Status 404', async () =>{
        const resultado = await request(app)
            .delete('/languages/1')
            .set('x-access-token', jwt);
        
        expect(resultado.status).toEqual(404);
    })

    it('Delete /languages/:label - É esperado Status 404', async () =>{
        const resultado = await request(app)
            .delete('/languages/ ')
            .set('x-access-token', jwt);
        
        expect(resultado.status).toEqual(404);
    })

    it('Patch /languages/:id - É esperado Status 200', async () =>{
        let testLanguageLocal = {
            label: "Portuguese",
            proficiency: 20,
            studying: true,
        } as ILanguage;
        
        const resultado = await request(app)
            .patch('/languages/' + testLanguagesId)
            .set('x-access-token', jwt)
            .send(testLanguageLocal);
        
        expect(resultado.status).toEqual(200);
        expect(resultado.body.proficiency).toBe(testLanguageLocal.proficiency)
        expect(resultado.body.id).toBe(testLanguagesId)
    })

    it('Patch /languages/:id - É esperado Status 404', async () =>{
        let testLanguageLocal = {
            proficiency: 20
        } as ILanguage;
        
        const resultado = await request(app)
            .patch('/languages/1')
            .set('x-access-token', jwt)
            .send(testLanguageLocal);
        
        expect(resultado.status).toEqual(404);
    })

    it('Patch /languages/:id - É esperado Status 400', async () =>{
        let testLanguageLocal = {
            proficiency: 20
        } as ILanguage;
        
        const resultado = await request(app)
            .patch('/languages/abc')
            .set('x-access-token', jwt)
            .send(testLanguageLocal);
        
        expect(resultado.status).toEqual(400);
    })

    it('Patch /languages/:id - É esperado Status 422', async () =>{
        let testLanguageLocal = {
            proficiency: 90
        } as ILanguage;
        
        const resultado = await request(app)
            .patch('/languages/'+testLanguagesId)
            .set('x-access-token', jwt)
            .send(testLanguageLocal);
        
        expect(resultado.status).toEqual(422);
    })
})