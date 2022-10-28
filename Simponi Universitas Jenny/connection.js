const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "",  
    database: "simponi_jenny_university"
});

db.connect((error) => {
    if (error) throw error;
    console.log(`Connect to Database is Success!`)
});

module.exports = db;