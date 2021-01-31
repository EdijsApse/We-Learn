const passport = require('passport');
const User = require('../models/user');

module.exports.renderLogin = (req, res) => {
    res.render('auth/login');
}

module.exports.login = passport.authenticate('local', {
    failureFlash: 'Invalid username or password',
    failureRedirect: '/login',
    successRedirect: '/',
    successFlash: 'Successfully signed in. Welcome back.'
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
        req.flash('success', 'Account created. You are now signed in');
        res.redirect('/');
    })
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Signed out. See you later!');
    res.redirect('/');
}