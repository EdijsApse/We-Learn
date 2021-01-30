/**
 * Receives function as paramater
 * Return function, which will call function which is passed in
 * Express will call catchAsyncError function, which is returning function, which will call function that is passed in
 * fn will return promise, thats why we have access to catch()
 * 
 * Alternative is using try catch in every async function (Simpler)
 * 
*/

module.exports.catchAsyncError = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(e => next(e));
    }
}

/**
 * Handling thrown errors by express
 * Flashing to session error & inputs variables and redirecting to url where error was triggered
 * 
 * @todo Rewrite || Rethink
 */
module.exports.errorhandlerMiddleware = (err, req, res, next) => {
    const { status = 500, message = 'Something went wrong!' } = err;
    const { body } = req;

    if (status === 404 || status === 403) {
        return res.status(status).render('error/404', {
            status, message
        });
    }
    req.flash('error', message);
    req.flash('inputs', body);
    return res.status(status).redirect('back');
}