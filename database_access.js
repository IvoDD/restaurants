const mysql = require('mysql');
const objects = require('./objects.js');

var exports = module.exports;

exports.loadRestaurants = (connection, restaurants, callback) => {
    connection.query("SELECT * FROM restaurants", (err, rows, fields) => {
        if (err){console.error(err);}
        for (let r of rows){
            restaurants.push(new objects.Restaurant(r.id, r.name, r.url, JSON.parse(r.menu)));
        }
        if (callback) callback();
    });
}