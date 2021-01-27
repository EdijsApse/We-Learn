const passport = require('passport');
const User = require('../models/user');

module.exports.renderLogin = (req, res) => {
    res.render('auth/login');
}

module.exports.login = passport.authenticate('local', {
    failureFlash: 'Invalid username or password',
    failureRedirect: '/login',
    successRedirect: '/'
})

module.exports.renderRegister = (req, res) => {
    res.render('auth/register');
}

module.exports.register = async (req, res, next) => {
    const { name, surname, email, password } = req.body;
    const user = new User({name, surname, email});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if (err) return next(err);
        res.redirect('/');
    })
}

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}