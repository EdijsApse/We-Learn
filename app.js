const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('App');
})

app.get('/login', (req, res) => {
    res.render('auth/login');
})

app.get('/register', (req, res) => {
    res.render('auth/register');
})

app.listen(3000, () => {
    console.log('App running in http://localhost:3000');
})