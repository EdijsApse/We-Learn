const Joi = require('joi');

module.exports.userSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required'
    }),
    surname: Joi.string().required().messages({
        'string.empty': 'Surname is required'
    }),
    email: Joi.string().required().email().messages({
        'string.empty': 'Email address is required',
        'string.email': 'Email address is not valid'
    }),
    password: Joi.string().required().min(5).messages({
        'string.empty': 'Password is required',
        'string.min': 'Password should be atleast 5 characters long'
    }),
    password_confirmation: Joi.any().valid(Joi.ref('password')).messages({
        'any.only': 'Passwords doesnt match'
    })
});