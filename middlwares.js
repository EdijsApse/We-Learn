const { userSchema } = require('./joiSchemas');

module.exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body, {abortEarly: false});

    if (error) {
        const { originalUrl, body } = req;
        console.log(error);
        const errors = error.details.map(e => {
            return {
                field: e.context.key,
                message: e.message
            }
        });
        
        req.flash('errors', errors);
        req.flash('inputs', body);

        return res.redirect(originalUrl);
    }
    
    next();
}