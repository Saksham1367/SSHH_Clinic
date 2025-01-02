const Joi = require("joi");
const consultSchema = Joi.object({
    consult:Joi.object({
        username:Joi.string().required(),
        number:Joi.number().required(),
        age:Joi.number().required().min(0),
        email:Joi.string().email(),
        gender: Joi.string().valid("male", "female", "others", "nan").required(),
        disease:Joi.string().required()
    }).required()
})

module.exports = consultSchema;