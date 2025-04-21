const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin@123",
  database: "meta_ads",
});

module.exports = connection;
