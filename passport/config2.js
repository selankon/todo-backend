// //configuring the strategies for passport
//
//
// // load all the things we need
// var LocalStrategy   = require('passport-local').Strategy;
// var pg           = require('pg');
//
//
// var config = require(".././config");
// var conString = config.connectionString;
//
// var client = new pg.Client(conString);
//
// // load up the user model
// var User            = require('../models/user2');
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
//         console.log(user.u_id +" was seralized");
//         done(null, user.u_id);
//     });
//
//     // used to deserialize the user
//     passport.deserializeUser(function(id, done) {
//         console.log(id + "is deserialized");
//         User.findById(id, function(err, user) {
//             done(err, user);
//         });
//     });
//
//     // =========================================================================
//     // LOCAL SIGNUP ============================================================
//     // =========================================================================
//     // we are using named strategies since we have one for login and one for signup
//     // by default, if there was no name, it would just be called 'local'
//
//     passport.use('local-signup', new LocalStrategy({
//             // by default, local strategy uses username and password, we will override with username
//             usernameField : 'username',
//             passwordField : 'password',
//             passReqToCallback : true // allows us to pass back the entire request to the callback
//         },
//         function(req, username, password, done) {
//
//             // asynchronous
//             // User.findOne wont fire unless data is sent back
//             process.nextTick(function(callback) {
//
//
//                 // find a user whose username is the same as the forms username
//                 // we are checking to see if the user trying to login already exists
//                 User.findOne(username, function(err, isNotAvailable, user) {
//                     //console.log('userfound: ' + isNotAvailable);
//                     // if there are any errors, return the error
//                     if (err)
//                         return done(err);
//                     //if (){
//                     //
//                     //}
//
//                     // check to see if theres already a user with that username
//                     if (isNotAvailable == true) {
//                         //console.log(user.username +' is not available');
//                         return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
//                     } else {
//                         console.log('new local user');
//
//                         // if there is no user with that username
//                         // create the user
//                         user            = new User();
//
//
//                         // set the user's local credentials
//
//                         user.username    = req.body.username;
//                       user.password     = req.body.password;
//                         //newUser.photo = 'http://www.flippersmack.com/wp-content/uploads/2011/08/Scuba-diving.jpg';
//
//                         user.save(function(newUser) {
//                             console.log("the object user is: ", newUser);
//                             passport.authenticate();
//                             return done(null, newUser);
//                             //newUser.password = newUser.generateHash(password);
//                         });
//                     }
//
//                 });
//
//             });
//
//         }));
//
//
//
//     // =========================================================================
//     // LOCAL LOGIN =============================================================
//     // =========================================================================
//     // we are using named strategies since we have one for login and one for signup
//     // by default, if there was no name, it would just be called 'local'
//
//     passport.use('local-login', new LocalStrategy({
//             // by default, local strategy uses username and password, we will override with username
//             usernameField : 'username',
//             passwordField : 'password',
//             passReqToCallback : true // allows us to pass back the entire request to the callback
//         },
//         function(req, username, password , done) { // callback with username and password from our form
//         // function(req, username, password, done) { // callback with username and password from our form
//         // console.log("!·QEFWEDEADFC" , req.body, res, done);
//
//           // find a user whose email is the same as the forms email
//           // we are checking to see if the user trying to login already exists
//           console.log("local-login IN -" , username , " : " , password);
//           User.findOne( username , function(err, avaiable, user) {
//             // console.log("FINDONE!  IN local-login " , avaiable, user);
//             // console.log("user.validPassword(password) " , user.validPassword(password));
//               // if there are any errors, return the error before anything else
//               if (err)
//                   return done(err);
//
//               // if no user is found, return the message
//               if (!avaiable){
//                   // return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
//                   console.log("NOT AVAIABLE USER");
//                   return done(null, false, { message: false} );
//                 }
//
//               // if the user is found but the password is wrong
//               if ( !user.validPassword(password) ){
//                   // return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
//                   console.log("INVALID PASSWORD");
//
//                   return done(null, false, { message: false} ); // create the loginMessage and save it to session as flashdata
//
//               }
//               // all is well, return successful user
//               return done(null, user);
//           });
//
//         }));
//
//
//     };
