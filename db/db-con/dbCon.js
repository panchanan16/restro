const mysql = require('mysql');

const con = mysql.createConnection({host: 'localhost',user: 'root',password : '',database: "restro", multipleStatements: true})


con.connect((err)=>{
    if (err) throw err;
    console.log('Connection Established')
  })

module.exports = con;