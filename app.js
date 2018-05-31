var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host    :'localhost',
    user    :'lm9204',
    password:'',
    database:'o2'
});

connection.connect();

var app = express();

app.use(bodyParser.urlencoded({ extended:false }));
app.locals.pretty = true;
app.set('views', './views_mysql');
app.set('view engine', 'jade');

app.get('/topic/add', (req, res) => {
    var sql = 'SELECT * FROM topic';
    connection.query(sql, (err, rows, fields) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }else {
            res.render('add', { topics:rows });
        }
    })
})

app.get('/topic/:id/edit' , (req, res) => {
    var sql = 'SELECT * FROM topic';
    connection.query(sql, (err, rows, fields ) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }else {
            res.render('edit', {
                topics      : rows,
                title       : rows[req.params.id - 1]['title'],
                description : rows[req.params.id - 1]['description'],
                author      : rows[req.params.id - 1]['author'],
                id          : req.params.id
            });
        }
    });
});

app.get(['/topic', '/topic/:id'], (req, res) => {
    var sql = 'SELECT * FROM topic';
    connection.query(sql, (err, rows, fields) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        if(req.params.id){
            res.render('view', { 
                topics      :rows,
                title       :rows[req.params.id - 1]['title'],
                description :rows[req.params.id - 1]['description'],
                author      : rows[req.params.id - 1]['author'],
                id          :req.params.id
             });
        }else {
            res.render('view', { topics:rows });
        }
    });
})
app.get('/topic/:id/delete', (req, res) => {
    var sql = 'SELECT * FROM topic';
    connection.query(sql, (err, topics, fields) => {
        var sql = 'SELECT * FROM topic WHERE id=?';
        connection.query(sql, [req.params.id], (err, rows, fields) => {
            if(err || rows.length === 0){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }else{
                res.render('delete', { topics:topics, title:rows[0]['title'], id:req.params.id });
            }
        });
    });
});

app.post('/topic/:id/edit', (req, res) => {
    var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
    var params = [ req.body.title, req.body.description, req.body.author, req.params.id ];
    connection.query(sql, params, (err, rows, fields ) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }else{
            res.redirect('/topic/'+req.params.id);
        }
    });
});
app.post('/topic/add', (req, res) => {
    var sql = 'INSERT INTO topic (title, description, author) VALUES ( ?, ?, ?)';
    var params = [ req.body.title, req.body.description, req.body.author];
    connection.query(sql, params, (err, rows, fields) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }else {
            res.redirect('/topic/'+rows.insertId);
        }
    });
})
app.post('/topic/:id/delete', (req, res) => {
    var sql = 'DELETE FROM topic WHERE id=?';
    connection.query(sql, req.params.id, (err, rows, fields) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }else{
            res.redirect('/topic');
        }
    });
});

app.listen(3000, () => {
    console.log("Connected 3000 Port! ");
})