const mysql = require("mysql");

var pool = mysql.createPool({
  user: "b85f8e54110a20",
  password: "f96b1395",
  database: "heroku_dd1fcca5d8ee5f1",
  host: "us-cdbr-east-03.cleardb.com",
  port: "3306",
});

exports.pool = pool;
