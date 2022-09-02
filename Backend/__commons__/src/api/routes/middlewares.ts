import {Router, Request, Response} from 'express';
import Joi from "joi";
import auth from '../auth';

function validateSchema (schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: any){
    const {error} = schema.validate(req.body);
    if (error == null) return next();

    const {details} = error;
    const message = details.map(item => item.message).join(',');

    console.log(message);
    res.status(422).end();
}

async function validateAuth (req: Request, res: Response, next: any){
    try{
        const token = req.headers['x-access-token'] as string;
        console.log(token);
        if (!token){
            console.log("Invalid token");
            return res.status(401).end();
        }
        const payload = await auth.verify(token);
        if (!payload){
            console.log("Invalid token's payload");
            return res.status(401).end();
        }
        res.locals.payload = payload;

        next();
    }
    catch(error){
        console.log(`validateAuth: ${error}`);
        res.status(400).end();
    }
}

export default { validateSchema, validateAuth }