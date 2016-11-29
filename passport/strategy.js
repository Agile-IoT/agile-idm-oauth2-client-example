var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2').Strategy;
var createError = require('http-errors');
var user = require('../db/users');
var tokens = require('../db/tokens');
var request = require('request');

// this overrides the get profile function from oauth2 strategy, since this interaction is not norrmative in oauth2
// more info here: https://github.com/jaredhanson/passport-oauth/issues/20
var profileFromIDM = function (conf, accessToken, done) {
  var options = {
    url: conf.userInfoUrl,
    headers: {
      'Authorization': 'bearer ' + accessToken,
      'User-Agent': 'user-agent',
      'Content-type': 'application/json'
    }
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      try {
        var user = JSON.parse(body);
        tokens.create(user.id, accessToken, function (error, token) {
          done(null, user);
        })

      } catch (error) {
        done(createError(500, "unexpected result from IDM userinfo endpoint " + body + error), null);
      }
    } else if (!error) {
      if (response.statusCode == 401)
        return done(null, null);
      else
        return done(createError(response.statusCode, "wrong satus code from remote AGILE webserver  for authentication: " + body), null);
    } else {
      return done(error, null);
    }
  });
};

//here we load the strategy to authenticate users in this app by using AGILE IDM
function loadStrategy(conf) {

  try {
    var strategy = new OAuth2Strategy({
        authorizationURL: conf.authorizationURL,
        tokenURL: conf.tokenURL,
        clientID: conf.clientID,
        clientSecret: conf.clientSecret,
        callbackURL: conf.callbackURL
      },
      function (accessToken, refreshToken, profile, cb) {
        console.log("user token obtained! " + accessToken);
        console.log("profile  " + JSON.stringify(profile));
        user.findOrCreate(profile.id, profile, function (err, user) {
          return cb(err, user);
        });
      });
    strategy.userProfile = profileFromIDM.bind(strategy, conf);
    passport.use(strategy);

  } catch (e) {
    console.log('FAIL TO register a strategy');
    console.log('ERROR: error loading oauth2  passport strategy: ' + e);
    return false;

  }

}
module.exports = loadStrategy;
