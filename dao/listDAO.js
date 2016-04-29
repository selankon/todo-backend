
var Utils = require('./Utils');
var express = require('.././app');
var config = require(".././config");
var connectionString = config.connectionString;
var pg = require('pg');

var ListDao = function (data) {
  this.data = data;
}

// Create a todo list and asociate to a owner
ListDao.create = function (data, res){

  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err});
      }

      // Transform Javascript Date object to mysql time
      data.creation = Utils.ISODateString(data.creation);

      // SQL Query > Insert Data
      var queryText = "INSERT INTO "+config.api.lists.tablename+"(name, creation, max_date, owner) values($1, $2, $3, $4) RETURNING _id_list";
      var newlyCreatedUserId;
      var insertList = client.query(
        queryText ,
        [data.name, data.creation, data.maxDate, data.owner,] ,
        function(err, result) {
          if(err) {console.log("Error! " , err); res.status(500).json({ success: false, data: err});}//handle error
          else {
            newlyCreatedUserId = result.rows[0]._id_list; // Getting the id of the new list
          }
        }
      );

      // Do the relation between user - list
      insertList.on('end', function(result) {
        var query = client.query(
          "INSERT INTO "+config.api.lists_users +"( _id_lists, _id_users, editable) values($1, $2, $3)",
          [  newlyCreatedUserId, data.owner, true]
        );
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json({ success: true, data: "all done"});
        });

      });

      // // SQL Query > Select Data
      // var query = client.query("SELECT * FROM "+config.api.lists.tablename+" ORDER BY _id_list ASC");
      //
      // // Stream results back one row at a time
      // query.on('row', function(row) {
      //     results.push(row);
      // });
      //
      // // After all data is returned, close connection and return results
      // query.on('end', function() {
      //     done();
      //     return res.json(results);
      // });

  });

}

// Get the lists of a owner
ListDao.getListsOfOwner = function (data, res){
  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err});
      }

      // SQL Query > Select Data
      // var queryText = "SELECT * FROM "+config.api.lists.tablename+" WHERE owner = '"+data.owner+"' ORDER BY creation ASC"
      var queryText = "SELECT * FROM "+config.api.lists.tablename+" WHERE owner = '"+data.owner+"' ORDER BY creation ASC"
      var query = client.query(queryText);

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

}

// ListDao.getSingle = function ( data, res ){
// }

ListDao.deleteList = function ( ){

}
ListDao.updateList = function ( ) {

}


module.exports = ListDao;
