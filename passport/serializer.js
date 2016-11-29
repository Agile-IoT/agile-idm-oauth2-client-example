var users = require('../db/users');
var passport = require('passport');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  users.find(id, function (err, user) {
    done(err, user);
  });
});
