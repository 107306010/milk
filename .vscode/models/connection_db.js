const config = require('../config/development_config');
const mysql = require("mysql");

const poolConnection = mysql.createPool({
    connectionLimit: config.mysql.connectionLimit,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    multipleStatements: true
});

poolConnection.getConnection(function (err, connection) {
    if (err) {
        console.log('connecting error!');
        return;
    }
    console.log('connecting success');
    connection.release();
});

module.exports = poolConnection;