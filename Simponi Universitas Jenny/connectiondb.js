const mysql = require('mysql');
const host = "localhost";
const user = "root";
const password = "";
const database = "simponi_jenny_university";

const db = mysql.createConnection({
    host: host, 
    user: user, 
    password: password,  
    database: database
});

db.connect((error) => {
    if (error) throw error;
    console.log(`Connect to Database '${database}' is Success!`)
});

module.exports = db;