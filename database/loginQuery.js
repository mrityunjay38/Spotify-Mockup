const dbQuery = require('./connect');


async function userLogin(username) {
    let sql = 'select password from Users where username = ?';
    return await dbQuery(sql,username);
}

module.exports = userLogin;

// let sql = `select password from Users where username = "${username}"`;