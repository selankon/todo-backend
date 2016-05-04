// var express = require('express');
// var router = express.Router();

// var pg = require('pg');
module.exports = function(clearRoutes, authedRoutes, jwt) {

  var path = require('path');
  var config = require(path.join(__dirname, '../', 'config'));
  var List = require(path.join(__dirname, '../', './models/list'));

  // *******************
  // *** [ LISTS ! ] ***
  // *******************
  // Lists API :
  // ------------------------------------
  // Create new list          -> POST
  // Read all lists of user   -> GET
  // Delete a list of user    -> DELETE
  // Update a list of user    -> PUT

  // LIST CREATION
  clearRoutes.post(config.api.lists.create, function(req, res) {
      var list  = new List (req.body);
      list.create(res);
  });

  // GET LISTS FROM USER
  authedRoutes.get(config.api.lists.get, function(req, res) {
      //  TODO - test!!!! Is JWT doing the auth work?
      // console.log("DFASAFGDSF " , req.decoded);
      var userToGet = req.decoded.opts.username;
      // var userToGet = req.headers.name;
      List.getLists(userToGet, res);
  });

  // LIST RELATION DELETION
  authedRoutes.delete(config.api.lists.delete, function(req, res) {
      //  TODO - test!!!! Is JWT doing the auth work?
      var userName = req.decoded.opts.username;
      // var userName = req.headers.name;
      // var id = req.params._id;
      List.deleteRelation(id, userName, res);

  });

  // TODO - ONLY UPDATE THE PEOPLE THAT CAN EDIT!!!!
  // LIST UPDATE
  authedRoutes.put(config.api.lists.update, function(req, res) {

      var id = req.params._id; // Get the id
      var list  = new List (req.body); // Get the parameters of the list and create new list object
      list.update(res);
  });
}
