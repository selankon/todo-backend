
// Ensure that the object matches with the schema
var schemas = require("./schemas.js");
var _ = require("lodash");


var Todo = function (data) {
  this.data = this.sanitize(data);
}
Todo.prototype.data = {}

Todo.prototype.changeName = function (name) {
    this.data.name = name;
}

// Todo.findById = function (id, callback) {
//     db.get('users', {id: id}).run(function (err, data) {
//         if (err) return callback(err);
//         callback(null, new User(data));
//     });
// }

// This basically ensure that this.data will matches with the schema
Todo.prototype.sanitize = function (data) {
    data = data || {};
    schema = schemas.todos;
    return _.pick(_.defaults(data, schema), _.keys(schema));
}

module.exports = Todo;
