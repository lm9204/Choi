var express = require('express');
var session = require('express-session');
var app = express();

app.use(session({
    secret:'12354',
    resave:false,
    saveUninitialized: true
}))

app.get('/count', (req, res) => {
    if(req.session.count) req.session.count++;
    else req.session.count = 1;
    res.send('result : '+req.session.count);
});
app.get('/tmp', (req, res) => {
    res.send('result : '+req.session.count);
})

app.listen(3003, () => {
    console.log('Connected 3003 port.');
});