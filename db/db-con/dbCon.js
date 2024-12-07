const mysql = require('mysql');

const con = mysql.createConnection({host: 'localhost',user: 'root',password : 'Phpmyadmin@1234567890',database: "restro", multipleStatements: true, port:3306})


con.connect((err)=>{
    if (err) throw err;
    console.log('Connection Established')
  })

module.exports = con;