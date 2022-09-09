import {AccountStatus} from './accountStatus';

export interface IAccount{
    id?: number,
    username: string,
    email: string,
    password: string,
    status?: AccountStatus,
    native_language: string
}