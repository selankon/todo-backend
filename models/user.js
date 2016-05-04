// /**  user.js **/
//
// // Ensure that the object matches with the schema
// var schemas = require("./schemas.js");
// var _ = require("lodash");
//
// var Dao = require ("../dao/userDAO.js");
//
//
// var User = function (data) {
//   this.data = this.sanitize(data);
// }
//
// User.prototype.data = {}
//
//
// // Create a User
// User.prototype.create = function (res) {
//   this.data.creation = new Date ();
//   Dao.create (this.sanitize(this.data), res);
// }
//
// // Get user by username
// User.getByUsername = function (username) {
//   Dao.getByUsername (username)
// }
//
// // Get user by id
// User.getById = function (id) {
//   Dao.getById (id)
// }
//
// // Update a User
// // User.prototype.update = function (res) {
// //   Dao.update (this.data, res);
// // }
//
// // Get all list of a User
// // User.getByUsername = function (name, res) {
// //   Dao.getLists (name, res)
// // }
//
// // Delete a user using his username
// // User.deleteUser = function (id, name, res) {
// //   Dao.deleteUser (id, name, res)
// // }
//
//
// // This basically ensure that this.data will matches with the schema
// User.prototype.sanitize = function (data) {
//     data = data || {};
//     schema = schemas.user;
//     return _.pick(_.defaults(data, schema), _.keys(schema));
// }
//
// module.exports = User;
