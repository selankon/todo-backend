//
// //all the routes for our application
// module.exports = function(app, passport) {
//   /* GET home page. */
//   app.get('/', function(req, res, next) {
//     res.json({ success: true, data: "Indeeeex"});
//
//     // res.render('index', { title: 'Express' });
//   });
//
//
//   // process the login form
//     // app.post('/login', do all our passport stuff here);
//     // process the login form
//     app.post('/login',
//       function(req, res, next) {
//         // console.log("gfabofshbgohjabs/zglhadbsaglhv ", req.body);
//         passport.authenticate('local-login',
//         {session:false},
//         // req, req.username , req.password ,
//
//
//         function(err, user, message) {
//           // if (err) { return next(err) }
//           // if (!user) {
//           //   return res.json(401, { error: 'message' });
//           // }
//
//           // If this function gets called, authentication was successful.
//           // `req.user` contains the authenticated user.
//           //  res.redirect('/users/' + req.user.username);
//           return res.json(user);
//           console.log("AUTHENTICATE JODEEEERR",err, user, message);
//        })
//      }
//    );
//
//
//     // =====================================
//     // PROFILE SECTION =====================
//     // =====================================
//     // we will want this protected so you have to be logged in to visit
//     // we will use route middleware to verify this (the isLoggedIn function)
//     app.get('/profile', isLoggedIn, function(req, res) {
//         // res.render('profile.ejs', {
//         //     user : req.user // get the user out of session and pass to template
//         // });
//
//         console.log(req.user);
//         res.json({ success: false, data: req.user});
//     });
//
// };
//
//
// // route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {
//
//     // if user is authenticated in the session, carry on
//     if (req.isAuthenticated()) {
//         console.log('isLoggedin');
//         return next();
//     }
//     console.log('is not logged in');
//
//     // if they aren't redirect them to the home page
//     res.json({ success: false, data: "NOT loggedin"});
//
//     res.redirect('/');
// }
