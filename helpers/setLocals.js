const ExpressForm = require('./ExpressForm');

/**
 * Setting view locals = variables which will be accessable in every view 
*/
module.exports = (req, res, next) => {
    const errors = req.flash('errors');
    let [ inputs ] = req.flash('inputs'); // @todo Check why connect-flash stores object in array by default?

    if (!inputs) inputs = {};

    res.locals.form = new ExpressForm(inputs, errors);
    res.locals.user = req.user;
    res.locals.error = req.flash('error');
    
    next();
}