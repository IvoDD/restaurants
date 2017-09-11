CREATE DATABASE restaurants;
USE restaurants;

CREATE TABLE restaurants (
    id int NOT NULL AUTO_INCREMENT, 
    name varchar(255), 
    url varchar(255), 
    menu text, PRIMARY KEY(id), 
    UNIQUE KEY(name)
);

CREATE TABLE waiters (
    id int NOT NULL AUTO_INCREMENT, 
    rest_id int NOT NULL,
    name varchar(255), 
    username varchar(255), 
    passhash varchar(255), 
    salt varchar(255), 
    PRIMARY KEY(id), 
    UNIQUE KEY(username), 
    FOREIGN KEY (rest_id) REFERENCES restaurants(id)
);

CREATE TABLE kitchens (
    id int NOT NULL AUTO_INCREMENT, 
    rest_id int NOT NULL, 
    info varchar(255), 
    PRIMARY KEY(id), 
    FOREIGN KEY(rest_id) REFERENCES restaurants(id)
);

CREATE TABLE clients (
    id int NOT NULL AUTO_INCREMENT, 
    rest_id int NOT NULL, 
    name varchar(255), 
    username varchar(255), 
    passhash varchar(255), 
    salt varchar(255), 
    PRIMARY KEY(id), 
    UNIQUE KEY(username), 
    FOREIGN KEY (rest_id) REFERENCES restaurants(id)
);