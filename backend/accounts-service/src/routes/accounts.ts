import {Router, Request, Response} from 'express';
import accountsController from '../controllers/accounts'
const router = Router();
import {validateUpdateAccount, validateAutorization, validateAccount, validateLogin, validateAuthentication} from './middlewares';
import Joi from "joi";

router.get('/accounts/', validateAuthentication,accountsController.getAccounts);

router.get('/accounts/user', validateAuthentication, accountsController.getOwnAccount);

router.get('/accounts/:id', validateAuthentication, validateAutorization, accountsController.getAccount);

router.patch('/accounts/:id', validateAuthentication, validateAutorization, validateUpdateAccount, accountsController.setAccount);

router.post('/accounts/', validateAccount, accountsController.addAccounts);

router.post('/accounts/login', validateLogin, accountsController.loginAccount);

router.post('/accounts/logout', validateAuthentication, accountsController.logoutAccount);

router.delete('/accounts/:id', validateAuthentication, validateAutorization, accountsController.removeAccount);

export default router