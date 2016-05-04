var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var passport = require('passport');
// var session = require('express-session');

var config = require('./config.js');
// var routes = require('./routes/index')(app, passport);
// var users = require('./routes/users')(app, passport);
// var lists = require('./routes/lists')(app);


// var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var app = express();
app.set('superSecret', config.secret); // secret variable

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); // Needed for auth
app.use(express.static(path.join(__dirname, 'public')));


// required for passport
// require('./passport/config2')(passport); // pass passport for configuration
// app.use(session({ secret: 'afljbcvbkdsb<lkbvdvsd<lizxbcli' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session


// Routes
// DOESN'T WORK DUE A FUCK*NG SHIT
// require('./routes/index.js')(app, passport);
// require('./routes/users.js')(app, passport);
// require('./routes/lists.js')(app, passport);

// app.use('/', routes);
// app.use('/', users);
// app.use('/', lists);

var jwt = require ('./lib/jwt-helper.js');
var clearRoutes = express.Router();
var authedRoutes = express.Router();
authedRoutes.use(function (req, res, next) {
  jwt.validate (req, res, next);
});
require('./routes/lists.js')(clearRoutes, authedRoutes, jwt);
require('./routes/auth.js')(clearRoutes, authedRoutes , app, jwt);

app.use('/api', clearRoutes, authedRoutes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
