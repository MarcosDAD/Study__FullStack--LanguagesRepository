import {Router, Request, Response} from 'express';
import accountsController from '../controllers/accounts'
const router = Router();
import {validateUpdateAccount, validateAccount, validateLogin, validateAuth} from './middlewares';
import Joi from "joi";

router.get('/accounts/', validateAuth,accountsController.getAccounts);

router.get('/accounts/:id', validateAuth, accountsController.getAccount);

router.patch('/accounts/:id', validateAuth, validateUpdateAccount, accountsController.setAccount);

router.post('/accounts/', validateAccount, accountsController.addAccounts);

router.post('/accounts/login', validateLogin, accountsController.loginAccount);

router.post('/accounts/logout', validateAuth, validateLogin, accountsController.logoutAccount);

export default router