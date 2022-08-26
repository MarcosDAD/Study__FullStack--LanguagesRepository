import request from 'supertest';
import {Response} from 'express';
import app from './../src/app';

describe ('Testando rotas do accounts', () => {
    it('GET /accounts/ - É esperado Status 200', async () =>{
        const resultado = await request(app)
            .get('/accounts/');
        
        expect(resultado.status).toEqual(200);
        expect(Array.isArray(resultado.body)).toBeTruthy();
    })

    it('POST /accounts/ - É esperado Status 201', async () =>{
        const payload = {
            id: 1,
            username: 'Marcos',
            email: 'marcos-dalcin@hotmail.com',
            password: 'abc123',
            native_language: 'Portuguese'
        }

        const resultado = await request(app)
            .post('/accounts')
            .send(payload)

        expect(resultado.status).toEqual(201)
        expect(resultado.body.id).toBe(1)
    })

    it('POST /accounts/ - É esperado Status 422', async () =>{
        const payload = {
            id: 1,
            job: 'Backend Developer'
        }

        const resultado = await request(app)
            .post('/accounts')
            .send(payload)

        expect(resultado.status).toEqual(422)
    })

    it('PATCH /accounts/:id - É esperado Status 200', async () =>{
        const payload = {
            username: 'Marcos Diniz',
            email: 'marcos-dalcin@hotmail.com',
            password: 'abc12345',
            native_language: 'Portuguese'
        }

        const resultado = await request(app)
            .patch('/accounts/1')
            .send(payload)

        expect(resultado.status).toEqual(200)
        expect(resultado.body.id).toBe(1)
    })

    it('PATCH /accounts/:id - É esperado Status 400', async () =>{
        const payload = {
            username: 'Marcos Diniz',
            email: 'marcos-dalcin@hotmail.com',
            password: 'abc12345',
            native_language: 'Portuguese'
        }

        const resultado = await request(app)
            .patch('/accounts/abc')
            .send(payload)

        expect(resultado.status).toEqual(400)
    })

    it('PATCH /accounts/:id - É esperado Status 404', async () =>{
        const payload = {
            username: 'Marcos Diniz',
            email: 'marcos-dalcin@hotmail.com',
            password: 'abc12345',
            native_language: 'Portuguese'
        }

        const resultado = await request(app)
            .patch('/accounts/-1')
            .send(payload)

        expect(resultado.status).toEqual(404)
    })

    it('GET /accounts/:id - É esperado Status 200', async () =>{
        const resultado = await request(app)
            .get('/accounts/1');
        
        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toBe(1);
    })

    it('GET /accounts/:id - É esperado Status 404', async () =>{
        const resultado = await request(app)
            .get('/accounts/2');
        
        expect(resultado.status).toEqual(404);
    })

    it('GET /accounts/:id - É esperado Status 400', async () =>{
        const resultado = await request(app)
            .get('/accounts/abc');
        
        expect(resultado.status).toEqual(400);
    })
})