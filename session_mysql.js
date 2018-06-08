var express = require('express');
var session = require('express-session');
var parser  = require('body-parser');
var MySQLStore = require('express-mysql-session')(session);
var app     = express();

app.use(session({
    secret:'12354',
    resave:false,
    saveUninitialized: true,
    store:new MySQLStore({
        host    :'localhost',
        port    :3306,
        user    :'lm9204',
        password:'',
        database:'o2'
    })
}));
app.use(parser.urlencoded({ extended: false }));

app.get('/count', (req, res) => {
    if(req.session.count) req.session.count++;
    else req.session.count = 1;
    res.send('result : '+req.session.count);
});

app.get('/auth/login', (req, res) => {
    var output = `
    <form action='/auth/login' method='post'>
        <p><input type='text' name='username' placeholder='username'></p>
        <p><input type='password' name='password' placeholder='password'></p>
        <p><input type='submit'></p>
    </form>
    `;
    res.send(output);
});
app.get('/welcome', (req, res) => {
    if(req.session.display) res.send(`<h1> Hello, ${req.session.display}</h1><a href='/auth/logout'>logout</a>`);
    else res.send(`<h1>Welcome.</h1><a href="/auth/login">login</a>`);
});
app.get('/auth/logout', (req, res) => {
    delete req.session.display;
    req.session.save( () => {
        res.redirect('/welcome');
    });
});
app.post('/auth/login', (req, res) => {
    var user = {
        username:'lm9204',
        password:'1111',
        display :'David'
    };
    if(req.body.username === user.username && req.body.password === user.password){
        req.session.display = user.display;
        req.session.save(() => {
            res.redirect('/welcome');
        });
    }else {
        res.send('Wrong Password or Username. <p><a href="/auth/login">login</a></p>');
    }
});

app.listen(3003, () => {
    console.log('Connected 3003 port.');
});