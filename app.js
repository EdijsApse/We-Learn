const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const { validateUser } = require('./middlwares');
const flash = require('connect-flash');
const session = require('express-session');
const ExpressForm = require('./helpers/ExpressForm');
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const ExpressError = require('./helpers/ExpressError');

const sessionConfig = {
    secret: 'temp-secret', //@todo Change to .env variable and real secret
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

mongoose.connect('mongodb://localhost:27017/we-learn', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.on("error", (e) => {
    console.log(e);
});

db.once("open", () => {
    console.log("Database connected");
});

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
    usernameField: 'email'
}, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    const errors = req.flash('errors');
    let [ inputs ] = req.flash('inputs'); // @todo Check why connect-flash stores object in array by default ?

    if (!inputs) inputs = {};

    res.locals.form = new ExpressForm(inputs, errors);
    res.locals.user = req.user;
    res.locals.error = req.flash('error');
    
    next();
})

app.get('/', (req, res) => {
    res.send('App');
})

app.get('/login', (req, res) => {
    res.render('auth/login');
})

app.get('/register', (req, res) => {
    res.render('auth/register');
})

app.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

app.post('/login', passport.authenticate('local', { failureFlash: 'Invalid username or password', failureRedirect: '/login', successRedirect: '/' }));

app.post('/register', validateUser, catchAsyncError(async (req, res, next) => {
    const { name, surname, email, password } = req.body;
    const user = new User({name, surname, email});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if (err) return next(err);
        res.redirect('/');
    })
}));

/**
 * Error handler
 */
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong!' } = err;
    const { originalUrl, body } = req;
    req.flash('error', message);
    req.flash('inputs', body);
    return res.status(status).redirect(originalUrl); 
});

app.listen(3000, () => {
    console.log('App running in http://localhost:3000');
})

/**
 * Receives function as paramater
 * Return function, which will call function which is passed in
 * Express will call catchAsyncError function, which is returning function, which will call function that is passed in
 * fn will return promise, thats why we have access to catch()
 * 
 * Alternative is using try catch in every async function (Simpler)
 * 
 * @param fn 
 */
function catchAsyncError(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(e => next(e));
    }
}