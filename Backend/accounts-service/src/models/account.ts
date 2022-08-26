export interface IAccount{
    id: number,
    username: string,
    email: string,
    password: string,
    status: number,
    native_language: string
}

import Joi from "joi";

const accountSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(1),
    username: Joi.string()
        .min(3)
        .max(150)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .max(50),
    status: Joi.number()
        .integer()
        .min(100)
        .max(400),
    native_language: Joi.string()
        .min(3)
        .max(40)
        .required()
})

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .max(50)
        .required()
})

export {accountSchema, loginSchema}