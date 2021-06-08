const mysql = require("mysql");

var pool = mysql.createPool({
  user: "root",
  password: "f96b1395",
  database: "lumex",
  host: "localhost",
  port: "3306",
});

exports.pool = pool;
