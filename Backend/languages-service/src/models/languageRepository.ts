import languageModel, {ILanguageModel} from './languageModel';
import {ILanguage} from './language';
import { DestroyOptions } from 'sequelize/types';

function findAll(accountId: number){
    console.log(`ID: ${accountId}`)
    return languageModel.findAll<ILanguageModel>({where: {accountId}});
}

function findById(languageId : number, accountId: number){
    return languageModel.findOne<ILanguageModel>({where: {id: languageId, accountId: accountId}});
}

function findByLabel(label : string, accountId: number){
    return languageModel.findOne<ILanguageModel>({where: {label, accountId}});
}

async function addLanguage(language : ILanguage, accountId: number){
    language.accountId = accountId;
    const result = await languageModel.create(language);
    language.id = result.id!;
    return language;
}

async function setLanguage(languageId: number, account : ILanguage, accountId: number){
    const originalAccount = await languageModel.findOne<ILanguageModel>({where: {id: languageId, accountId}});
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

async function removeLanguage(languageId : number, accountId: number){
    return await languageModel.destroy({where: {id: languageId, accountId}} as DestroyOptions<ILanguage>);
}

async function removeLanguageByLabel(label : string, accountId: number){
    return await languageModel.destroy({where: {label, accountId}} as DestroyOptions<ILanguage>);
}

export default { findAll, findById, findByLabel, addLanguage, setLanguage, removeLanguage, removeLanguageByLabel }