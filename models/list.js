var List = function (data) {
  this.data = data;
}
List.prototype.data = {}

List.prototype.changeName = function (name) {
    this.data.name = name;
}

List.findById = function (id, callback) {
    db.get('users', {id: id}).run(function (err, data) {
        if (err) return callback(err);
        callback(null, new User(data));
    });
}

module.exports = List;
