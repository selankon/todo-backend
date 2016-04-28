/*
FILE USED FOR CREATE QUERYS TO DATABASE (for test connection)
*/

var pg = require('pg');
var config = require('.././config');
var query = 'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)'

console.log("Conection string" , config.db.complete_path);
// console.log("Conection string" , config.aa);


var connectionString = process.env.DATABASE_URL || config.db.complete_path;
// var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
var client = new pg.Client(connectionString);
client.connect();
var query = client.query(query);
query.on('end', function() { client.end(); });
