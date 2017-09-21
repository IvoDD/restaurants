const mysql = require("mysql");
const database = require("./database_access.js");
const EventEmmiter = require("events");

class MyEmmiter extends EventEmmiter {}

const emmiter = new MyEmmiter();

const db_config = {
    host: 'localhost',
    user: 'root',
    password: 'jjkofajj',
    database: 'restaurants'
};

var connection = mysql.createConnection(db_config);

emmiter.on('1', ()=>{
    console.log("asdf");
    database.login(connection, "waiter", "pesho", "pesho", (user) => {console.log(user); emmiter.emit('2')});
});
emmiter.on('2', ()=>{
    database.register(connection, "waiter", 1, "Pesho", "pesho", "pesho", (user)=>{console.log(user); emmiter.emit('3');});
});
emmiter.on('3', ()=>{
    database.login(connection, "waiter", "pesho", "pesho", (user) => {console.log(user); emmiter.emit('4')});
});
emmiter.on('4', ()=>{
    database.login(connection, "waiter", "pesho", "gosho", (user) => {console.log(user); emmiter.emit('5')});
});

emmiter.emit('1');