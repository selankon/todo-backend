var config = {};

//Api port:
var port = '3000';
config.port = '3000';
// config.port = normalizePort(process.env.PORT || port);

//Database configurations
config.db = {};
config.db.url = 'localhost';
config.db.port = ':5432';
config.db.db_name = '/todo';
config.db.username = 'todouser';
config.db.pasword = 'todouser';
config.db.complete_path = 'postgres://'+config.db.username+':'+config.db.pasword+'@'+config.db.url+config.db.port+config.db.db_name;

config.connectionString =  process.env.DATABASE_URL || config.db.complete_path;

var base = '/api';
config.api = {};

// Api list gestion
config.api.lists = {};
config.api.lists.create = base + '/lists';//POST - Create list of specific user
config.api.lists.read = base + '/lists';//GET - Return lists of specific user
config.api.lists.update = base + '/lists/:list_id';//PUT
config.api.lists.delete = base + '/lists/:list_id';//DELETE
config.api.lists.tablename = 'lists';

// Api todos gestion
config.api.todos = {};
config.api.todos.create = base + '/todos/:list_id';//POST
config.api.todos.read = base + '/todos/:list_id';//GET
config.api.todos.update = base + '/todos/:todo_id';//PUT
config.api.todos.delete = base + '/todos/:todo_id';//DELETE
config.api.todos.tablename = 'todos';

// Api users gestion
config.api.users = {};
config.api.users.tablename = 'users';


// Realtion lists_users Database
config.api.lists_users = config.api.lists.tablename + "_" + config.api.users.tablename




config.testTable = 'items';


module.exports = config;
