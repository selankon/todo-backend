var Utils = require('./Utils');
var express = require('.././app');
var config = require(".././config");
var connectionString = config.connectionString;
var pg = require('pg');

var UserDAO = function (data) {
  this.data = data;
}

// Create user
UserDAO.create = function (data , res) {

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

      // SQL Query > Select Data
      // Select all the tables asociated to a user
      var queryText = "INSERT INTO "+config.api.users.tablename+" (mail_user, password_user, img, user_name, creation) values ($1, $2, $3, $4, $5 )";

      var query = client.query (
        queryText,
        [data.mail, data.password, data.img, data.username, data.creation],
        function (err, result) {
          if (err) {
            console.log("Error! " , err);
            res.status(500).json({ success: false, data: err});
          }
        }
      )
      query.on('end', function() {
          done();
          return res.json({ success: true, data: data});
      });
  });

}

UserDAO.getByUsername  = function (username, res){

  var results = [];

  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Select Data
    // Select all the tables asociated to a user
    var queryText = "SELECT * FROM "+config.api.users.tablename+" WHERE user_name = '"+username+"' ";

    return client.query(queryText);

    // // Stream results back one row at a time
    // query.on('row', function(row) {
    //     results.push(row);
    // });
    //
    // query.on('end', function() {
    //     done();
    //     return res.json(results);
    // });
  });

}
UserDAO.getById  = function (id, res){
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    var queryText = "SELECT * FROM "+config.api.users.tablename+" WHERE _id_user = '"+id+"' ";
    return client.query(queryText);
    // query.on('row', function(row) {
    //     results.push(row);
    // });
    // query.on('end', function() {
    //     done();
    //     return res.json(results);
    // });
  });
}

module.exports = UserDAO;
