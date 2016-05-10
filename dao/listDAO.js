
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
      var queryText = "INSERT INTO "+config.api.lists.tablename+"(name, creation, max_date, owner, last_update) values($1, $2, $3, $4, $5) RETURNING _id_list";
      var newlyCreatedUserId;
      var insertList = client.query(
        queryText ,
        [data.name, data.creation, data.maxDate, data.owner, data.lastUpdate] ,
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
ListDao.getLists = function (name, res){

  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err});
      }
      if (name){
        // SQL Query > Select Data
        // Select all the tables asociated to a user
        var queryText = "SELECT * FROM "+config.api.lists.tablename+" WHERE _id_list IN ( SELECT _id_lists FROM "+config.api.lists_users+" WHERE _id_users = '"+name+"' )  ORDER BY creation ASC";

        var query = client.query(queryText);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json({results});
        });

      } else {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err});
      }

  });

}

// This delete the relation in the table lits_users
ListDao.deleteRelation = function (id, username, res){
  pg.connect(connectionString, function(err, client, done) {

    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // Query that delete if the relation exists
    var queryText = "DELETE FROM "+config.api.lists_users+" WHERE _id_lists = ($1) AND _id_users = ($2)";

    var query = client.query (queryText , [id, username]);

    // Stream results back one row at a time
    // query.on('row', function(row) {
    //     results.push(row);
    // });

    // After all data is returned, close connection and return results
    query.on('end', function() {
        done();
        return res.json({ success: true});
    });


  });


}

// This delete the list from the lists
ListDao.deleteListFromAll = function (id, username, res){
  pg.connect(connectionString, function(err, client, done) {

    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // 1- Check if its the owner
    // var queryText = select * from lists where _id_list = '22' AND owner = 'test'
    // 2- Get all references from lists_users and delete it
    // select * from lists_users where _id_lists = '22'
    // 3- Delete from lists

  });
}


ListDao.update = function (data , res) {
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
     done();
     console.log(err);
     return res.status(500).send(json({ success: false, data: err}));
    }

    data.lastUpdate = Utils.ISODateString(data.lastUpdate);


    // SQL Query > Update Data
    var queryText = "UPDATE "+config.api.lists.tablename+" SET name=($1), max_date=($2), owner=($3), last_update=($4) WHERE _id_list=($5) ";

    var query = client.query(
      queryText,
      [data.name, data.maxDate, data.owner, data.lastUpdate, data._id],
      function(err, result) {
       if(err) {console.log("Error! " , err); res.status(500).json({ success: false, data: err});}
     }
    );

    query.on('end', function() {
       done();
       return res.json({ success: true});
    });

    // SQL Query > Select Data
    // var query = client.query("SELECT * FROM items ORDER BY id ASC");
    //
    // // Stream results back one row at a time
    // query.on('row', function(row) {
    //    results.push(row);
    // });
    //
    // // After all data is returned, close connection and return results
    // query.on('end', function() {
    //    done();
    //    return res.json(results);
    // });





  });

}


module.exports = ListDao;
