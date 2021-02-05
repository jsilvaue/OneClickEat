
const mysql = require('mysql');

//local mysql db connection
const connection = mysql.createConnection({
    host: 'db4free.net',
    port: 3306,
    user: 'ocfmaster',
    password: 'ocfmaster',
    database: 'ocfmaster'
});
connection.connect(function (err, args) {
    console.log("Information on Arguments ::: ", JSON.stringify(args));
    try {
        if (err) throw err;
        console.log("Database Connected!");
    } catch (e) {
        console.error("Error connecting to database, Database is offline or user does not have permission to access ::: ", err);
    }


});
module.exports = connection;
