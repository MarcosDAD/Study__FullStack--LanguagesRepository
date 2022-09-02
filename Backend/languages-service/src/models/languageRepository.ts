import accountModel, {ILanguageModel} from './languageModel';
import {ILanguage} from './language';
import { DestroyOptions } from 'sequelize/types';

function findAll(accountId: number){
    console.log(`ID: ${accountId}`)
    return accountModel.findAll<ILanguageModel>({where: {accountId}});
}

function findById(id : number){
    return accountModel.findByPk<ILanguageModel>(id);
}

function findByLabel(label : string){
    return accountModel.findOne<ILanguageModel>({where: {label}});
}

function newAccount(account : ILanguage){
    return accountModel.create(account);
}

async function setAccount(id: number, account : ILanguage){
    const originalAccount = await accountModel.findByPk<ILanguageModel>(id);
    if (originalAccount !== null){
        if (account.label)
            originalAccount.label = account.label;
        if (account.proficiency)
            originalAccount.proficiency = account.proficiency;
        if (account.studying)
            originalAccount.studying = account.studying;
        await originalAccount.save()
        return originalAccount;
    }
    return null;
}

function removeAccount(idAccount : number){
    return accountModel.destroy({where: {id: idAccount}} as DestroyOptions<ILanguage>);
}

function removeAccountByLabel(label : string){
    return accountModel.destroy({where: {label}} as DestroyOptions<ILanguage>);
}

export default { findAll, findById, findByLabel, newAccount, setAccount, removeAccount, removeAccountByLabel }