import {Router, Request, Response} from 'express';
import {accountSchema, accountUpdateSchema, loginSchema} from '../models/accountSchemas'
import Joi from "joi";
import auth from '../auth';
import commonsMiddleware from 'lo-commons/api/routes/middlewares';
import controllerCommons from 'lo-commons/api/controllers/controller';
import {Token} from 'lo-commons/api/auth';
import { rmSync } from 'fs';
import { debug } from 'console';

function validateAccount (req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(accountSchema, req, res, next);
}

function validateUpdateAccount (req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(accountUpdateSchema, req, res, next);
}

function validateLogin (req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(loginSchema, req, res, next);
}

async function validateAuthentication (req: Request, res: Response, next: any){
    return commonsMiddleware.validateAuth(req, res, next);
}

async function validateAutorization(req: Request, res: Response, next: any){
    const accountId = parseInt(req.params.id);
    if(!accountId) return res.status(400).end();

    const token = controllerCommons.getToken(res) as Token;
    if (accountId !== token.accountId) return res.status(403).end();

    next();
}

export { validateAccount, validateAutorization, validateUpdateAccount, validateLogin, validateAuthentication }