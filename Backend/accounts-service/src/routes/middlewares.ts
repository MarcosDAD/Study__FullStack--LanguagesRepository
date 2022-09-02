import {Router, Request, Response} from 'express';
import {accountSchema, accountUpdateSchema, loginSchema} from '../models/accountSchemas'
import Joi from "joi";
import auth from '../auth';
import commonsMiddleware from 'lo-commons/api/routes/middlewares';

function validateAccount (req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(accountSchema, req, res, next);
}

function validateUpdateAccount (req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(accountUpdateSchema, req, res, next);
}

function validateLogin (req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(loginSchema, req, res, next);
}

async function validateAuth (req: Request, res: Response, next: any){
    return commonsMiddleware.validateAuth(req, res, next);
}

export { validateAccount, validateUpdateAccount, validateLogin, validateAuth }