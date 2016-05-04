// var express = require('express');
// var router = express.Router();
//
// var path = require('path');
// var config = require(path.join(__dirname, '../', 'config'));
// var User = require(path.join(__dirname, '../', './models/user'));
//
// // *******************
// // *** [ USERS ! ] ***
// // *******************
// // Users API :
// // ------------------------------------
// // Create new users           -> POST
// // Read user by username      -> GET
// // Delete a user              -> DELETE
// // Update a user              -> PUT
//
// // LIST CREATION
// router.post(config.api.users.create, function(req, res) {
//     var user  = new User (req.body);
//     user.create(res);
// });
//
// // GET USER
// router.get(config.api.lists.get, function(req, res) {
//     //TODO
//     // TODO
//     //  TODO !!!! This will be changed wen a JWT are configurated
//     var userToGet = req.headers.name;
//     List.getLists(userToGet, res);
// });
//
//
// // GET users listing.
// // router.get('/', function(req, res, next) {
// //   res.send('respond with a resource');
// // });
//
// module.exports = router;
