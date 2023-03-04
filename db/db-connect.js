const mysql = require('mysql')

const dbConf = {
    host: "localhost",
    user: "root",
    password: "",
    database: "Angular_Node_Crud",
    port: 3306
}

const pool = mysql.createPool(dbConf)

function connectDB(callback){
    try {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log('failed to connect')
            }
            callback(err, connection);
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports = {connectDB}