const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "meta_ads",
});

connection.connect(function (err, connection) {
  if (err) console.log("Kết nối không thành công", err);
  console.log("Connecting successfully");
});

module.exports = connection
