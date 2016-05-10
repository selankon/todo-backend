// var middleware  = require ('./middleware');

module.exports = function(clearRoutes, authedRoutes , app, jwt) {
  var User   = require('../models/user2'); // get our mongoose model

  // Used for create a test user
  clearRoutes.get('/setup', function(req, res) {

    // create a sample user
    var nick = new User({
      mail:"super@superuser.com",
      password: "super",
      img: "https://scotch.io/wp-content/themes/scotchpress/img/logo-large.png",
      username: "super"
    });
    // save the sample user
    nick.save(
      function(result) {
      console.log('User saved successfully');
      res.json(result);
    });


  });


  // route to authenticate a user (POST http://localhost:8080/api/authenticate)
  clearRoutes.post('/auth', function(req, res) {

    // console.log("AUTH REQ . " , req.body);

    // find the user
    User.findOne( req.body.username, function(err, user) {

      if (err) res.json( err );

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      }
      else if (user) {
        // check if password matches
        if (!user.validPassword (req.body.password)) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          // if user is found and password is right
          // create a token

          // var token = jwt.sign(user, app.get('superSecret'), {
          //   expiresIn: '1d' // expires in 24 hours
          // });
          opts = {}
          opts.username =  user.data.username
          opts.mail =  user.data.mail
          opts.img =  user.data.img
          var token = jwt.generateToken(req, opts)

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            user: user.data
          });
        }

      }

    });
  });

  // Route for create a user
  clearRoutes.post('/user', function(req, res) {

    // find the user
    User.findOne( req.body.username, function(err, user) {

      if (err) res.json( err );

      if (user) {
        res.json({ success: false, message: 'User already exists' });
      }
      else if (!user) {
        if (err) res.json( err );


          var user = new User (req.body);
          user.save(
            function(result) {
            console.log('User saved successfully');
            res.json(result);
          });


      }

    });


  });


  // Used for create a test user
  authedRoutes.get('/middleware', function(req, res) {
      res.json({middleware : true});


  });


};
