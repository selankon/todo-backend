// // https://gist.github.com/manjeshpv/84446e6aa5b3689e8b84
// // load all the things we need
// var express = require('.././app');
//
// // var schemas = require("../schemas/schemas.js");
// var User = require("../models/user.js");
// var config = require(".././config");
// var connectionString = config.connectionString;
// var pg = require('pg');
//
// var LocalStrategy   = require('passport-local').Strategy;
//
// // expose this function to our app using module.exports
// module.exports = function(passport) {
//
//     // =========================================================================
//     // passport session setup ==================================================
//     // =========================================================================
//     // required for persistent login sessions
//     // passport needs ability to serialize and unserialize users out of session
//
//     // used to serialize the user for the session
//     passport.serializeUser(function(user, done) {
// 		    done(null, user.username);
//     });
//
//     // used to deserialize the user
//     passport.deserializeUser(function(id, done) {
// 		  //   connection.query("select * from users where id = "+id,function(err,rows){
//   		// 	done(err, rows[0]);
//   		// });
//       pg.connect(connectionString, function(err, client, done) {
//         var queryText = "SELECT * FROM "+config.api.users.tablename+" WHERE user_name = '"+username+"' ";
//         var query =  client.query(
//           queryText,
//           function (err, result) {
//             done(err, result[0]);
//           }
//         );
//       }
//     });
//
//
//    	// =========================================================================
//     // LOCAL SIGNUP ============================================================
//     // =========================================================================
//     // we are using named strategies since we have one for login and one for signup
//   	// by default, if there was no name, it would just be called 'local'
//
//     // passport.use('local-signup',
//     //   new LocalStrategy({
//     //       // by default, local strategy uses username and password, we will override with email
//     //       usernameField : 'username',
//     //       passwordField : 'password',
//     //       passReqToCallback : true // allows us to pass back the entire request to the callback
//     //   },
//     //   function(req, username, password, done) {
//     //
//     //     // var query = User.getByUsername (username);
//     //
//     // 		// find a user whose email is the same as the forms email
//     // 		// we are checking to see if the user trying to login already exists
//     //     connection.query("select * from users where email = '"+email+"'",function(err,rows){
//     // 			console.log(rows);
//     // 			console.log("above row object");
//     // 			if (err)
//     //                 return done(err);
//     // 			 if (rows.length) {
//     //                 return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//     //             } else {
//     //
//     // 				// if there is no user with that email
//     //         // create the user
//     //         var newUserMysql = new Object();
//     //
//     // 				newUserMysql.email    = email;
//     //                 newUserMysql.password = password; // use the generateHash function in our user model
//     //
//     // 				var insertQuery = "INSERT INTO users ( email, password ) values ('" + email +"','"+ password +"')";
//     // 					console.log(insertQuery);
//     // 				connection.query(insertQuery,function(err,rows){
//     // 				newUserMysql.id = rows.insertId;
//     //
//     // 				return done(null, newUserMysql);
//     // 				});
//     //             }
//     // 		});
//     //   }
//     // ));
//
//     // =========================================================================
//     // LOCAL LOGIN =============================================================
//     // =========================================================================
//     // we are using named strategies since we have one for login and one for signup
//     // by default, if there was no name, it would just be called 'local'
//
//     passport.use('local-login',
//       new LocalStrategy({
//           // by default, local strategy uses username and password, we will override with username
//           usernameField : 'username',
//           passwordField : 'password',
//           passReqToCallback : true // allows us to pass back the entire request to the callback
//       },
//       function(req, username, password, done) { // callback with username and password from our form
//
//
//       pg.connect(connectionString, function(err, client, done) {
//         var results = [];
//
//         // Handle connection errors
//         if(err) {
//           done();
//           console.log(err);
//           return res.status(500).json({ success: false, data: err});
//         }
//         var queryText = "SELECT * FROM "+config.api.users.tablename+" WHERE user_name = '"+username+"' ";
//         var query =  client.query(
//           queryText,
//           function (err, result) {
//             if (err)
//               return done(err);
//           }
//         );
//         query.on('row', function(row) {
//             results.push(row);
//         });
//         query.on('end', function() {
//           // if the user is found but the password is wrong
//           if (!( results[0].password == password))
//               return done(null, false, {message: 'Wrong user name or password'}); // create the loginMessage and save it to session as flashdata
//
//           // all is well, return successful user
//           return done(null, results[0]);
//         });
//       });
//
//
//
//
//
//       })
//     );
//
// };
