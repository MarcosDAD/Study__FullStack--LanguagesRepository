import {Request, Response} from 'express';
import {ILanguage} from '../models/language';
import repository from '../models/languageRepository';
import controllerCommons from 'lo-commons/api/controllers/controller';
import {Token} from 'lo-commons/api/auth';

async function getLanguages (req: Request, res: Response, next: any){
    const token = controllerCommons.getToken(res) as Token;
    const languages = await repository.findAll(token.accountId);
    
    res.json(languages);
}

export default {getLanguages}