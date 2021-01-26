const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const { validateUser } = require('./middlwares');
const flash = require('connect-flash');
const session = require('express-session');
const ExpressForm = require('./helpers/ExpressForm');

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

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
    const errors = req.flash('errors');
    let [ inputs ] = req.flash('inputs'); // @todo Check why connect-flash stores object in array by default ?

    if (!inputs) inputs = {};

    res.locals.form = new ExpressForm(inputs, errors);
    
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

app.post('/register', validateUser, (req, res) => {
    res.send(req.body);
})

app.listen(3000, () => {
    console.log('App running in http://localhost:3000');
})