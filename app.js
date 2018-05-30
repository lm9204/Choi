var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended:false }));
app.locals.pretty = true;
app.set('views', './views');
app.set('view engine', 'jade');

app.get('/topic/new', (req, res) => {
    res.render('new');
})

app.get(['/topic', '/topic/:title'], (req, res) => {
    fs.readdir('data', (err, files) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        } 
        if(req.params.title){
            fs.readFile('data/'+req.params.title, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', { topics:files, title:req.params.title, description:data });
            });
        } else {
            res.render('view', { topics:files, title:'Welcome', description:'Hello, JavaScript for Server' });
        }
    });  
})
app.post('/topic', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, (err) => {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        } 
        res.redirect('/topic/'+title);
    })
})

app.listen(3000, () => {
    console.log("Connected 3000 Port! ");
})