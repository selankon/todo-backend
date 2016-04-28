var express = require('express');
var router = express.Router();

var pg = require('pg');
var path = require('path');
var config = require(path.join(__dirname, '../', 'config'));
// var config = require(path.join(__dirname, '../', 'config'));
var connectionString = config.connectionString;

// var config = require('.././config');
// var connectionString =  config.db.complete_path;
// var connectionString = process.env.DATABASE_URL || config.db.complete_path;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//*** [ lists ! ] ***
// LIST API :
// ------------------------------------
// create new list
// read all lists of user
// delete a list of user
// update a list of user
// LIST CREATION
router.post(config.api.lists.create, function(req, res) {

    var results = [];

    // Grab data from http request
    var list = {};
    if (req.body.name){ //NAME
      list.name = req.body.name;
    }
    if (req.body.maxDate) { //MAXDATE
      list.maxDate = req.body.maxDate;
    }
    if (req.body.owner) {//OWNER
      list.owner = req.body.owner;
    }
    list.creation = new Date();//CREATION DATE


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO "+config.api.lists.create+"(name, creation, max_date, ) values($1, $2)", [data.text, data.complete]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM "+config.api.lists.create+" ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });


    });
});


//*** [ todos ! ]
// ITEM todos CREATION
// router.post(config.api.todos.create, function(req, res) {
//
//     var results = [];
//
//     // Grab data from http request
//     var data = {text: req.body.text, complete: false};
//
//     // Get a Postgres client from the connection pool
//     pg.connect(connectionString, function(err, client, done) {
//         // Handle connection errors
//         if(err) {
//           done();
//           console.log(err);
//           return res.status(500).json({ success: false, data: err});
//         }
//
//         // SQL Query > Insert Data
//         client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);
//
//         // SQL Query > Select Data
//         var query = client.query("SELECT * FROM items ORDER BY id ASC");
//
//         // Stream results back one row at a time
//         query.on('row', function(row) {
//             results.push(row);
//         });
//
//         // After all data is returned, close connection and return results
//         query.on('end', function() {
//             done();
//             return res.json(results);
//         });
//
//
//     });
// });


module.exports = router;
