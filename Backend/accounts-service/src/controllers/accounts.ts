import {Request, Response} from 'express';
import {IAccount} from '../models/account';
import repository from '../models/accountRepository';
import auth from '../auth';

async function getAccounts (req: Request, res: Response, next: any){
    const accounts : IAccount[] = await repository.findAll();
    res.json(accounts.map(item => {
        item.password = "";
        return item;
    }));
}

async function getAccount (req: Request, res: Response, next: any){
    try{
        const id = parseInt(req.params.id);
        if(!id) throw new Error ("ID is invalid format")

        const account = await repository.findById(id);
        if (account === null)
            return res.status(404).end();
        else{
            account.password = '';
            return res.json(account);
        }
    }
    catch (error){
        console.log(error);
        res.status(400).end();
    }
}

async function addAccounts (req: Request, res: Response, next: any){
    try{
        const newAccount = req.body as IAccount;
        newAccount.password = auth.hashPass(newAccount.password);
        const result = await repository.newAccount(newAccount);
        newAccount.password = ''; //Limpar a password antes de responder a request pra evitar que ela passe pela WEB API
        newAccount.id = result.id; //Recolher ID que foi incrementado na nova conta do banco de dados antes de responder a request
        res.status(201).json(newAccount);
    }
    catch(error){
        console.log(error);
        res.status(400).end();
    }
}

async function setAccount (req: Request, res: Response, next: any){
    try{
        const accountId = parseInt(req.params.id);
        if(!accountId) throw new Error ("ID is invalid format")

        const accountParams = req.body as IAccount;
        
        if (accountParams.password)
            accountParams.password = auth.hashPass(accountParams.password);
        
        const updateParams = await repository.setAccount(accountId, accountParams)
        if (updateParams !== null){
            updateParams.password = '';

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

async function loginAccount (req: Request, res: Response, next: any){
    try{
        const loginParams = req.body as IAccount;
        const account = await repository.findByEmail(loginParams.email);
        if (account !== null){
            const validAccount = auth.comparePass(loginParams.password, account.password)
            if (validAccount){
                const token = await auth.sign(account.id!);
                res.json({auth: true, token});
            }
        }

        return res.status(401).end();
    }
    catch (error){
        console.log(`loginAccount: ${error}`);
        return res.status(400).end();
    }
}

async function logoutAccount (req: Request, res: Response, next: any){
    res.json({auth: false, token: null});
}

export default {getAccounts, getAccount, addAccounts, setAccount, loginAccount, logoutAccount}