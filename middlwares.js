const { userSchema, postSchema, commentSchema } = require('./joiSchemas');
const ExpressError = require('./helpers/ExpressError');
const Post = require('./models/post');

const handleValidation = (req, res, next, schema) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const { body } = req;
        const backUrl = req.header('Referer');
        const errors = error.details.map(e => {
            return {
                field: e.context.key,
                message: e.message
            }
        });
        
        req.flash('errors', errors);
        req.flash('inputs', body);

        return res.redirect(backUrl);
    }
    
    next();
}

module.exports.isAuth = (req, res, next) => {
    if (req.user) {
        return next();
    }

    res.redirect('/login');
}

module.exports.canAuth = (req, res, next) => {
    if (!req.user) {
        return next();
    }

    res.redirect('/');
}

module.exports.validateUser = (req, res, next) => {
    return handleValidation(req, res, next, userSchema);
}

module.exports.validatePost = (req, res, next) => {
    return handleValidation(req, res, next, postSchema);
}

module.exports.validateComment = (req, res, next) => {
    return handleValidation(req, res, next, commentSchema);
}

module.exports.canDeletePost = async (req, res, next) => {
    const { id } = req.params;
    const { _id } = req.user;

    const post = await Post.estimatedDocumentCount({_id: id, user: _id});

    if (post) {
        return next();
    }

    next(new ExpressError(403, 'You dont have permission to delete this post'));
}