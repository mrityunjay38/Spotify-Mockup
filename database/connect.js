require('dotenv').config();
const mysql = require('mysql');

// Database credentials

const loginDetails = {
    host : process.env.HOST,
    user : process.env.USERNAME,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
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

function dbQuery(query, value) {
    return new Promise ( (resolve,reject) => {
        database.query(query, value, (err,result) => {
            if(err)
                reject(err);
            else 
                resolve(result);
        })
    })
}

module.exports = dbQuery;

