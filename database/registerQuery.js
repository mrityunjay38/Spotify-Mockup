const dbQuery = require("./connect");

async function userRegister(userDetails) {
  let sql = "insert into Users (email, username, password) values (?, ?, ?)";
  return await dbQuery(sql, Object.values(userDetails));
}

module.exports = userRegister;
