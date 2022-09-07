import {Router, Request, Response} from 'express';
import {languageSchema, languageUpdateSchema} from '../models/languageSchemas'
import commonsMiddleware from 'lo-commons/api/routes/middlewares';
function validateLangageSchema (req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(languageSchema, req, res, next);
}

function validateUpdateLanguageSchema (req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(languageUpdateSchema, req, res, next);
}

export { validateLangageSchema, validateUpdateLanguageSchema,}