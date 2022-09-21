import Joi from "joi";

const languageSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(1),
    accountId: Joi.number()
        .integer()
        .min(1),
    label: Joi.string()
        .min(3)
        .max(150)
        .required(),
    proficiency: Joi.number()
        .integer()
        .min(10)
        .max(60),
    studying: Joi.boolean()
})

const languageUpdateSchema = Joi.object({
    label: Joi.string()
        .min(3)
        .max(150),
    proficiency: Joi.number()
        .integer()
        .min(10)
        .max(60),
    studying: Joi.boolean()
})

export {languageSchema, languageUpdateSchema}