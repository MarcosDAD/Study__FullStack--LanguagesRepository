import accountModel, {IAccountModel} from './accountModel';
import {IAccount} from './account';
import { DestroyOptions } from 'sequelize/types';

function findAll(){
    return accountModel.findAll<IAccountModel>();
}

function findById(id : number){
    return accountModel.findByPk<IAccountModel>(id);
}

function findByEmail(accountEmail : string){
    return accountModel.findOne<IAccountModel>({where: {email: accountEmail}});
}

function newAccount(account : IAccount){
    return accountModel.create(account);
}

async function setAccount(id: number, account : IAccount){
    const originalAccount = await accountModel.findByPk<IAccountModel>(id);
    if (originalAccount !== null){
        if (account.username)
            originalAccount.username = account.username;
        if (account.native_language)
            originalAccount.native_language = account.native_language;
        if (account.status)
            originalAccount.status = account.status;
        if (account.password)
            originalAccount.password = account.password;
        await originalAccount.save()
        return originalAccount;
    }
    return null;
}

function removeAccount(idAccount : number){
    return accountModel.destroy({where: {id: idAccount}} as DestroyOptions<IAccount>);
}

function removeAccountByEmail(emailAccount : string){
    return accountModel.destroy({where: {email: emailAccount}} as DestroyOptions<IAccount>);
}

export default { findAll, findById, findByEmail, newAccount, setAccount, removeAccount, removeAccountByEmail }