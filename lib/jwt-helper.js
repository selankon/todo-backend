// https://github.com/dwyl/learn-json-web-tokens/blob/master/example/lib/helpers.js
// var qs   = require('querystring');
// var fs   = require('fs');
// var path = require('path');

// var level = require('level');
// var db = level(__dirname + '/db');

var config = require('../config.js');

var jwt  = require('jsonwebtoken');
var secret = process.env.JWT_SECRET || config.secret; // super secret

// function loadView(view) {
//   var filepath = path.resolve(__dirname + '/../views/' + view + '.html');
//   return fs.readFileSync(filepath).toString();
// }

// Content
// var index      = loadView('index');      // default page
// var restricted = loadView('restricted'); // only show if JWT valid
// var fail       = loadView('fail');       // auth fail



// generate a GUID
function generateGUID() {
  return new Date().getTime(); // we can do better with crypto
}

// create JWT
// function generateToken(req, GUID, opts) {
function generateToken(req, opts) {
  opts = opts || {};

  var GUID   = generateGUID(); // write/use a better GUID generator in practice

  // By default, expire the token after 7 days.
  // NOTE: the value for 'exp' needs to be in seconds since
  // the epoch as per the spec!
  // var expiresDefault = Math.floor(new Date().getTime()/1000) + 7*24*60*60;
  var expiresDefault = Math.floor(new Date().getTime()/1000) + 60; //1Hour
  opts.auth = GUID;
  // opts.agent = req.headers['user-agent'];
  // opts.expires = opts.expires || expiresDefault;

  var token = jwt.sign({
    opts
  }, secret , {expiresIn: '1d'});
  return token;
}

// function generateAndStoreToken(req, opts) {
//   var GUID   = generateGUID(); // write/use a better GUID generator in practice
//   var token  = generateToken(req, GUID, opts);
//   var record = {
//     "valid" : true,
//     "created" : new Date().getTime()
//   };
//
//   db.put(GUID, JSON.stringify(record), function (err) {
//     // console.log("record saved ", record);
//   });
//
//   return token;
// }

// function authSuccess(req, res) {
//   var token = generateAndStoreToken(req);
//
//   res.writeHead(200, {
//     'content-type': 'text/html',
//     'authorization': token
//   });
//   return res.end(restricted);
// }

// lookup person in "database"
// var u = { un: 'masterbuilder', pw: 'itsnosecret' };

// handle authorisation requests
// function authHandler(req, res){
//   if (req.method === 'POST') {
//     var body = '';
//     req.on('data', function (data) {
//       body += data;
//     }).on('end', function () {
//       var post = qs.parse(body);
//       if(post.username && post.username === u.un && post.password && post.password === u.pw) {
//         return authSuccess(req, res);
//       } else {
//         return authFail(res);
//       }
//     });
//   } else {
//     return authFail(res);
//   }
// }



// can't use the word private as its an ES "future" reserved word!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords
// function privado(res, token) {
//   res.writeHead(200, {
//     'content-type': 'text/html',
//     'authorization': token
//   });
//   return res.end(restricted);
// }

// show fail page (login)
function authFail(res, callback) {
  return res.status(403).send({
        success: false,
        message: 'No token provided.' });
  // res.writeHead(401, {'content-type': 'text/html'});
  // return res.end(fail);
}

function decode(token) {
  var decoded = false;
  try {
    decoded = jwt.verify(token, secret);
  } catch (e) {
    decoded = { err : e}; // still false
  }
  return decoded;
}

function getToken (req) {
  return req.body.token || req.query.token || req.headers['x-access-token'];
}

function validate(req, res, callback) {
  // var token = req.headers.authorization;
  var token = getToken(req);
  console.log("Validating token ");

  var decoded = decode(token);
  if( !decoded ) {
    // authFail(res);
    // return callback(res);
    return authFail(res);

  }
  else {
    // check if a key exists, else import word list:
    // verifies secret and checks exp
    if (decoded.err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
    } else {
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      callback();
    }
  };

}

module.exports = {
  generateToken : generateToken,
  validate : validate,
  getToken : getToken,
  decode : decode
}

// function exit(res) {
//   res.writeHead(404, {'content-type': 'text/plain'});
//   res.end('bye');
//   process.exit(); // kill the server!
// }
//
// function notFound(res) {
//   res.writeHead(404, {'content-type': 'text/plain'});
//   return res.end('Not Found');
// }
//
// function home(res) {
//   res.writeHead(200, {'content-type': 'text/html'});
//   return res.end(index);
// }
//
// function done(res) {
//   return; // does nothing. (pass as callback)
// }

// function logout(req, res, callback) {
//   // invalidate the token
//   var token = req.headers.authorization;
//   // console.log(' >>> ', token)
//   var decoded = verify(token);
//   if(decoded) { // otherwise someone can force the server to crash by sending a bad token!
//     // asynchronously read and invalidate
//     db.get(decoded.auth, function(err, record){
//       var updated    = JSON.parse(record);
//       updated.valid  = false;
//       db.put(decoded.auth, updated, function (err) {
//         // console.log('updated: ', updated)
//         res.writeHead(200, {'content-type': 'text/plain'});
//         res.end('Logged Out!');
//         return callback(res);
//       });
//     });
//   } else {
//     authFail(res, done);
//     return callback(res);
//   }
// }



// module.exports = {
//   fail : authFail,
//   exit: exit,
//   done: done, // moch callback
//   home: home,
//   handler : authHandler,
//   logout : logout,
//   notFound : notFound,
//   success : authSuccess,
//   validate : validate,
//   verify : verify,
//   view : loadView,
//   generateAndStoreToken: generateAndStoreToken
// }
