const mysql = require('mysql');
const crypto = require('crypto');
const key = "this is a random key";
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

const tableType = {"waiter": "waiters",
                   "client": "clients",
                   "restaurant": "restaurants"};
exports.register = (connection, type, rest_id = 0, name, username, password, callback) => { //rest_id required only for waiter
    let table = tableType[type];
    let toInsert = {};
    if (type == "waiter"){toInsert.rest_id = rest_id;}
    toInsert.name = name;
    toInsert.username = username;
    toInsert.salt = genSalt(64);
    toInsert.passhash = calcSaltedHash(password, toInsert.salt);
    connection.query("INSERT INTO ?? SET ?", [table, toInsert], (err, result) => {
        if (err){callback(objects.invalidUser); return;}
        callback(new objects.User(result.insertId, type, name, username, toInsert.passhash, toInsert.salt));
    });
}
exports.login = (connection, type, username, password, callback) => {
    let table = tableType[type];
    connection.query("SELECT * FROM ?? WHERE username = ?", [table, username], (err, rows, fields) => {
        if (err || rows.length == 0){callback(objects.invalidUser); return;}
        let current = new objects.User(rows[0].id, type, rows[0].name, username, calcSaltedHash(password, rows[0].salt), rows[0].salt);
        if (current.passhash == rows[0].passhash){callback(current);}
        else{callback(objects.invalidUser);}
    });
}
function genSalt (n){
    let salt = "";
    for (let i=0; i<n; ++i){
        salt += Math.floor(Math.random()*10);
    }
    return salt;
}
function calcSaltedHash (password, salt){
    let hash = crypto.createHmac('sha512', key);
    hash.update(password+salt);
    return hash.digest('hex');
}