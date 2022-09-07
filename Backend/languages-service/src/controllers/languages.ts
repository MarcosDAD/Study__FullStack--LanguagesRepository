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

async function getLanguage (req: Request, res: Response, next: any){
    try{
        const languageId = parseInt(req.params.id);
        const languageLabel = req.params.id;

        const token = controllerCommons.getToken(res) as Token;
        if (!languageId){
            if (languageLabel){
                let account = await repository.findByLabel(languageLabel, token.accountId);
                if (account === null)
                    throw new Error ("Empty Field")
                else
                    return res.json(account);
            }
        }
        const account = await repository.findById(languageId, token.accountId);
        if (account === null)
            throw new Error ("Empty Field")
        else{
            return res.json(account);
        }
    }
    catch (error){
        console.log(error);
        res.status(404).end();
    }
}

async function addLanguage (req: Request, res: Response, next: any){
    try{
        const newAccount = req.body as ILanguage;
        const token = controllerCommons.getToken(res) as Token;

        const result = await repository.addLanguage(newAccount, token.accountId);
        newAccount.id = result.id; //Recolher ID que foi incrementado na nova conta do banco de dados antes de responder a request
        res.status(201).json(newAccount);
    }
    catch(error){
        console.log(error);
        res.status(400).end();
    }
}

async function setLanguage (req: Request, res: Response, next: any){
    try{
        const languageId = parseInt(req.params.id);
        if(!languageId) throw new Error ("ID is invalid format")

        const token = controllerCommons.getToken(res) as Token;
        const languageParams = req.body as ILanguage;
        
        const updateParams = await repository.setLanguage(languageId, languageParams, token.accountId);
        if (updateParams !== null){
            res.status(200).json(updateParams);
        }
        else{
            res.status(404).end();
        }
    }
    catch(error){
        console.log(error);
        res.status(400).end();
    }
}

async function removeLanguage (req: Request, res: Response, next: any){
    try{
        const languageId = parseInt(req.params.id);
        const languageLabel = req.params.id;

        const token = controllerCommons.getToken(res) as Token;

        if (!languageId){
            if (languageLabel){
                let removed = await repository.removeLanguageByLabel(languageLabel, token.accountId);
                if (removed > 0)
                    return res.status(200).end()
                else
                    throw new Error ("Empty Field")
            }
        } 

        const removed = await repository.removeLanguage(languageId, token.accountId);
        if (removed > 0){
            res.status(200).end();
        }
        else{
            throw new Error ("Empty Field")
        }
    }
    catch(error){
        console.log(`removeAccount: ` + error);
        res.status(404).end()
    }
}

export default {getLanguages, getLanguage, addLanguage, setLanguage, removeLanguage};