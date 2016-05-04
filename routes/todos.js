var express = require('express');
var router = express.Router();

// var pg = require('pg');

var path = require('path');
var config = require(path.join(__dirname, '../', 'config'));
var List = require(path.join(__dirname, '../', './models/todo'));


// *******************
// *** [ TODOS ! ] ***
// *******************
// Todos API :
// ------------------------------------
// Create new todo asociated to lists
// Read all todos of a list
// Delete a todo of a list
// Update a todo of a list


// TODOS CREATION
router.post(config.api.lists.create, function(req, res) {
    var list  = new List (req.body);
    list.create(res);
});

// TODOS LISTS FROM USER
// router.get(config.api.lists.get, function(req, res) {
//     //TODO
//     // TODO
//     //  TODO !!!! This will be changed wen a JWT are configurated
//     var userToGet = req.headers.name;
//     List.getLists(userToGet, res);
// });
//
// // TODOS RELATION DELETION
// router.delete(config.api.lists.delete, function(req, res) {
//     //TODO
//     // TODO
//     //  TODO !!!! This will be changed wen a JWT are configurated
//     var userName = req.headers.name;
//     // var id = req.params._id;
//     console.log("DELETE PETITION : username -> " , userName , " list id -> " , id);
//     List.deleteRelation(id, userName, res);
//
// });
//
// // TODOS UPDATE
// router.put(config.api.lists.update, function(req, res) {
//
//   console.log("LIST UPDATE MIERDA JOER PUUUUUUUUTA VIDA TETE", req.body);
//     var id = req.params._id; // Get the id
//     var list  = new List (req.body); // Get the parameters of the list and create new list object
//     list.update(res);
// });

module.exports = router;
