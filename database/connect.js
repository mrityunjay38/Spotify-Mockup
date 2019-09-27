const mysql = require('mysql');

// Database credentials

const loginDetails = {
    host : 'localhost',
    user : 'mj',
    password : '12',
    database : 'spotify'
}

// Establish connection

const database = mysql.createConnection(loginDetails);

database.connect( err => {
    if(err){
        throw(err);
    }
    console.log('MySql Database connected...');
});

// database.end();

// Promisify query

function dbQuery(query, val) {
    return new Promise ( (resolve,reject) => {
        database.query(query, val, (err,result) => {
            if(err)
                reject(err);
            else 
                resolve(result);
        })
    })
}

module.exports = dbQuery;

