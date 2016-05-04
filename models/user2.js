var pg            = require('pg');
var bcrypt        = require('bcrypt');

var config        = require(".././config");
var conString = config.connectionString;

var client = new pg.Client(conString);

var schemas       = require("./schemas.js");
var _             = require("lodash");

var Utils         = require('../dao/Utils');
var bcrypt        = require('bcrypt-nodejs');

var User = function (data){

    this.sanitize = function (data) {
      // console.log("SANITIZE" , data);
        data = data || {};
        schema = schemas.user;
        return _.pick(_.defaults(data, schema), _.keys(schema));
    }

    // methods ======================
    // generating a hash
    this.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10) );
    };

    // checking if password is valid
    this.validPassword = function(password, hash) {
        return bcrypt.compareSync(password,  this.data.password, null);
    };

    this.save = function(callback) {
      
        var conString = config.connectionString;

        var client = new pg.Client(conString);
        client.connect();

        console.log(this.data.username +' will be saved');

        // Modification of some things
        this.data.creation = new Date ();
        this.data.creation = Utils.ISODateString(this.data.creation);
        this.data.password = this.generateHash (this.data.password)


        var queryText = "INSERT INTO "+config.api.users.tablename+" (mail_user, password_user, img, user_name, creation) values ($1, $2, $3, $4, $5 )";

        // INSERT user
        client.query(
          queryText,
          [this.data.mail, this.data.password, this.data.img, this.data.username, this.data.creation],
          function (err, result) {
            if(err){
                console.error('error running query', err);
                return callback(err)
            }
            console.log(result.rows);
            //console.log(this.email);
          }
        );

        // GET and return the user
        client.query('SELECT * FROM users ORDER BY _id_user desc limit 1', null, function(err, result){

            if(err){
                return callback(err);
            }
            //if no rows were returned from query, then new user
            if (result.rows.length > 0){
                console.log(result.rows[0] + ' is found!');
                var user = new User( User.mapping (result.rows[0]) );
                // user.email= result.rows[0]['email'];
                // user.password = result.rows[0]['password'];
                // user.u_id = result.rows[0]['u_id'];
                // console.log(user.email);
                console.log("user object created " , user.data.username);
                client.end();
                return callback(user);
            }
        });
            //whenever we call 'save function' to object USER we call the insert query which will save it into the database.
        };


        this.data = this.sanitize(data);



    };

User.mapping = function (data){

  return {
    _id: data._id_user,
    mail: data.mail_user,
    password: data.password_user,
    img: data.img,
    username: data.user_name,
    creation: new Date (data.creation)
  }
}

User.findOne = function(username, callback){
    var conString =  config.connectionString;
    var client = new pg.Client(conString);

    var isNotAvailable = false; //we are assuming the username is taking
    //var email = this.email;
    //var rowresult = false;
    console.log(username , ' is in the findOne function test');
    //check if there is a user available for this email;
    client.connect();
    client.query("SELECT * from "+config.api.users.tablename+" where user_name=$1", [username], function(err, result){
        if(err){
            return callback(err, isNotAvailable);
        }
        //if no rows were returned from query, then new user
        if (result.rows.length > 0){
            isNotAvailable = true; // update the user for return in callback
            ///email = email;
            //password = result.rows[0].password;
            console.log(username , ' is already registered');
        }
        else{
            isNotAvailable = false;
            //email = email;
            return callback(false, isNotAvailable );
            console.log(username , ' is not registered');
        }
        //the callback has 3 parameters:
        // parameter err: false if there is no error
        // parameter isNotAvailable: whether the email is available or not
        // parameter this: the User object;
        var user = new User ( User.mapping (result.rows[0]) );
        client.end();
        return callback(false, user );


    });
//});
};

User.findById = function(id, callback){
    console.log("we are in findbyid");
    var conString = config.connectionString;
    var client = new pg.Client(conString);

    client.connect();
    client.query("SELECT * from "+config.api.users.tablename+" where _id_user=$1", [_id], function(err, result){

        if(err){
            return callback(err, null);
        }
        //if no rows were returned from query, then new user
        if (result.rows.length > 0){
          console.log(result.rows[0] + ' is found!');
          var user = new User( result.rows[0] );
          // user.email= result.rows[0]['email'];
          // user.password = result.rows[0]['password'];
          // user.u_id = result.rows[0]['u_id'];
          // console.log(user.email);
          console.log("user object created " , user);
          client.end();
          return callback(user);
        }
    });
};







module.exports = User;
