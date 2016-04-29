/**  list.js **/

// Ensure that the object matches with the schema
var schemas = require("./schemas.js");
var _ = require("lodash");

var Dao = require ("../dao/listDAO.js");

var List = function (data) {
  this.data = this.sanitize(data);
}

List.prototype.data = {}

List.prototype.changeName = function (name) {
  this.data.name = name;
}

List.prototype.create = function (res) {
  this.data.creation = new Date ();
  this.data = this.sanitize(this.data);
  Dao.create (this.data, res);
}

List.getListsOfOwner = function (res) {
  Dao.getListsOfOwner (this.data, res)
}





// List.findById = function (id, callback) {
//     db.get('users', {id: id}).run(function (err, data) {
//         if (err) return callback(err);
//         callback(null, new User(data));
//     });
// }

// This basically ensure that this.data will matches with the schema
List.prototype.sanitize = function (data) {
    data = data || {};
    schema = schemas.list;
    return _.pick(_.defaults(data, schema), _.keys(schema));
}

module.exports = List;
