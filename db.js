
const mysql = require("mysql2");

const pool = mysql.createPool({
   host: 'localhost',
  user: 'root',
  password: 'king1111',
  database: 'drinkswift_db' 
});

module.exports = pool.promise();
