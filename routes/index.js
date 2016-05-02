var express = require('express');
var router = express.Router();

var pg = require('pg');

var path = require('path');
// Configuration file
var config = require(path.join(__dirname, '../', 'config'));
// var connectionString = config.connectionString;

// List object
var List = require(path.join(__dirname, '../', './models/list'));

// var config = require('.././config');
// var connectionString =  config.db.complete_path;
// var connectionString = process.env.DATABASE_URL || config.db.complete_path;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// *******************
// *** [ LISTS ! ] ***
// *******************
// Lists API :
// ------------------------------------
// Create new list
// Read all lists of user
// Delete a list of user
// Update a list of user

// LIST CREATION
router.post(config.api.lists.create, function(req, res) {
    var list  = new List (req.body);
    list.create(res);
});

// GET LISTS FROM USER
router.get(config.api.lists.get, function(req, res) {
    // This will be changed wen a JWT are configurated
    var userToGet = req.headers.name;
    List.getLists(userToGet, res);
});

// LIST RELATION DELETION
router.delete(config.api.lists.delete, function(req, res) {
    // This will be changed wen a JWT are configurated
    var userName = req.headers.name;
    // var id = req.params._id;
    console.log("DELETE PETITION : username -> " , userName , " list id -> " , id);
    List.deleteRelation(id, userName, res);

});

// LIST UPDATE
router.put(config.api.lists.update, function(req, res) {

  console.log("LIST UPDATE MIERDA JOER PUUUUUUUUTA VIDA TETE", req.body);
    var id = req.params._id; // Get the id
    var list  = new List (req.body); // Get the parameters of the list and create new list object
    list.update(res);
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
