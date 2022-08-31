import request from 'supertest';
import app from '../src/app';
import {IAccount} from '../src/models/account';
import repository from '../src/models/accountRepository';
import auth from '../src/auth';


const plainPass = "abc1234";
const hashPass = auth.hashPass(plainPass);
const testAccount : IAccount = {
    username: "JestUser",
    password: hashPass,
    email: "jest@jest.com",
    native_language: "jestguese",
    status: 100
}

beforeAll(async () => {
    await repository.newAccount(testAccount);
})

afterAll(async () => {
    await repository.removeAccountByEmail(testAccount.email);
})
 
describe('Testando rotas de autenticação', () =>{
    it('POST /accounts/login - 200 OK', async () =>{
        //testing
        const payload = {
            email: testAccount.email,
            password: plainPass
        }

        const resultado = await request(app)
            .post('/accounts/login')
            .send(payload)
        
        expect(resultado.status).toEqual(200)
        expect(resultado.body.auth).toBeTruthy();
        expect(resultado.body.token).toBeTruthy();
    })
    
    it('POST /accounts/login - 422 Unprocessable Entity', async () =>{
        const payload = {
            email: testAccount.email
        }

        const resultado = await request(app)
            .post('/accounts/login')
            .send(payload)

        expect(resultado.status).toEqual(422)
    })

    it('POST /accounts/login - 401 Unauthorized', async () =>{
        const payload = {
            email: testAccount.email,
            password: plainPass+'1'
        }

        const resultado = await request(app)
            .post('/accounts/login')
            .send(payload)

        expect(resultado.status).toEqual(401)
    })
})