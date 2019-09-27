const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'mj',
    password : '12',
    database : 'spotify'
});

db.connect( err => {
    if(err){
        throw err;
    }
    console.log('MySql connected....');
});