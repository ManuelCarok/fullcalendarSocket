let config = require('../config');
const mysql = require('mysql');

exports.query = function (query, params) {
    return new Promise((resolve, reject) => {

        var connection = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            port: config.porthost,
            database: config.database
        });

        connection.connect();

        connection.query(query, params, function (err, rows, fields) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });

        connection.end();
    })
} 