import request from 'supertest';
import app from './../src/app';

describe('Testando rotas de autenticação', () =>{
    it('POST /accounts/login - 200 OK', async () =>{
        //mocking
        const newAccount = {
            id: 1,
            username: 'Marcos',
            email: 'marcos-dalcin@hotmail.com',
            password: 'abc12345',
            native_language: 'Portuguese'
        }

        await request(app)
            .post('/accounts')
            .send(newAccount)

        //testing
        const payload = {
            email: 'marcos-dalcin@hotmail.com',
            password: 'abc12345'
        }

        const resultado = await request(app)
            .post('/accounts/login')
            .send(payload)

        expect(resultado.status).toEqual(200)
        expect(resultado.body.auth).toBeTruthy();
        expect(resultado.body.token).toBeTruthy();
    })

    it('POST /accounts/login - 422 Unauthorized', async () =>{
        const payload = {
            email: 'marcos-dalcin@hotmail.com',
            password: 'abc'
        }

        const resultado = await request(app)
            .post('/accounts/login')
            .send(payload)

        expect(resultado.status).toEqual(422)
    })

    it('POST /accounts/login - 401 Unauthorized', async () =>{
        const payload = {
            email: 'marcos-dalcin@hotmail.com',
            password: 'abc1234'
        }

        const resultado = await request(app)
            .post('/accounts/login')
            .send(payload)

        expect(resultado.status).toEqual(401)
    })
})