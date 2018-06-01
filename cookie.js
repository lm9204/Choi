var express = require('express');
var cookie = require('cookie-parser');
var app = express();
app.use(cookie());

var products = {
    1:{title:'The history of web 1'},
    2:{title:'The next web'},
    3:{title:'Google Economy'}
};
app.get('/products', (req, res) => {
    var output = '';
    for(var name in products) {
        output += `<li><a href='/cart/${name}'>${products[name].title}</li></a>`;
    }
    res.send("<h1>Product</h1><ul>"+output+"</ul><a href='/cart'>Cart List</a>");
});

app.get('/cart', (req, res) => {
    var cart = req.cookies.cart
    if(!req.cookies.cart) res.send('empty');
    else{
        var output = '';
        for(var id in cart){
            output += `<li>${products[id].title} : ${cart[id]}</li>`
        }
        res.send('<ul>'+output+'</ul><a href="/products">Product List</a>')
    }
});

app.get('/cart/:id', (req, res) => {
    if(req.cookies.cart) var cart = req.cookies.cart;
    else var cart = {};
    if(!cart[req.params.id]) cart[req.params.id] = 0;
    cart[req.params.id] += 1;

    res.cookie('cart', cart);
    res.redirect('/cart');
});

app.get('/count', (req, res) => {
    if(req.cookies.count) var count = parseInt(req.cookies.count);
    else var count = 0;
    count++;
    res.cookie('count', count);
    res.send('count : '+count);
});

app.listen(3003, () => {
    console.log('Connected 3003 port.');
});