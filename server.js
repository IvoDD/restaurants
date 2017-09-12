const mysql = require('mysql');
const database = require('./database_access.js');
const objects = require('./objects.js');
const gets = require('./get_handler.js');

const db_config = {
    host: 'localhost',
    user: 'root',
    password: 'jjkofajj',
    database: 'restaurants'
};

var connection;

function connectToDatabase() {
    connection = mysql.createConnection(db_config);

    connection.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(connectToDatabase, 5000);
        }else{
            console.log("Successfull database load.");
        }
    });

    connection.on('error', function(err) {
        console.log('db error', err);
        setTimeout(connectToDatabase, 5000); 
    });
}

connectToDatabase();

var restaurants = [];
database.loadRestaurants(connection, restaurants, runServer);

function runServer() {
    let express = require('express');
    let app = express();
    let http = require('http').Server(app);
    let io = require("socket.io")(http);

    for (let r of restaurants){
        app.get('/' + r.url, (req, res) => {
            res.sendFile(__dirname + "/views/index.html");
        });
    }
    gets.handle(express, app);
    app.get("/objects.js", (req, res) => {
        res.sendFile(__dirname + "/objects.js");
    });
    app.get("/*", (req, res) => {
        res.sendFile(__dirname + "/views/" + req.url);
    });
    
    io.on('connection', (socket) => {
        let ind = -1;
        socket.emit('restaurants', restaurants);

        socket.on('url', (url) => {
            let i = getInd(url);
            socket.emit('name', restaurants[i].name);
        });
    });

    http.listen(8080, () => {
        console.log("Server started on 8080.");
    });
}

function getInd(url){
    for (let i=0; i<restaurants.length; ++i){
        if (restaurants[i].url == url){
            return i;
        }
    }
}