const Joi = require('joi');
const categories = ['Web Development', 'Programming languages', 'IT'];

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

module.exports.postSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Post title is required'
    }),
    body: Joi.string().required().min(100).messages({
        'string.empty': 'Post body is required',
        'string.min': 'Post content should be atleast 100 characters'
    }),
    category: Joi.number().required().valid(...categories.keys()).messages({
        'number.required': 'Category is required',
        'any.only': 'Please select category from list'
    })
})