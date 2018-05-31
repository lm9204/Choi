var mysql = require('mysql');
var connection = mysql.createConnection({
    host    :'localhost',
    user    :'lm9204',
    password:'',
    database:'o2'
});

connection.connect();

// var sql = 'SELECT * FROM topic';
// connection.query(sql, (err, rows, fields) => {
//     if(err) console.log(err);
//     else {
//         for(var i=0; i<rows.length; i++){
//             console.log(rows[i]);
//         }
//     }
// });
var sql = 'INSERT INTO topic (title, description, author) VALUES (?, ?, ?)';
var params = ['Supervisor', 'Watcher', 'graphittie'];
connection.query(sql, params, (err, rows, fields) => {
    if(err) console.log(err);
    else console.log(rows);
});
connection.end();