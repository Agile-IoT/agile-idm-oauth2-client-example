var passport = require('passport');
var express = require('express');
var login = require('connect-ensure-login');
var tokens = require('../db/tokens');
var request = require('request');

function router(conf, idm_conf, router) {
  /*
   Routes for Oauth2 endpoint as client
  */
  router.route('/auth/example').get(passport.authenticate('oauth2'));

  router.route('/auth/example/callback').get(passport.authenticate('oauth2', {
      failureRedirect: '/login'
    }),
    function (req, res) {
      res.redirect('/');
      //res.redirect('/');
    });

  /* index */
  //this route uses the login middleware to ensure there is a user logged in, and then shows the authenticated website
  //in this way, when a user is authenticated and goes to the home page, he sees the authenticated site, if not he is redirected.
  //but there is no "landing" page to click on "authenticate with IDM"
  //If you want to have users to land in only one site, regardless of whether they are authenticated or not use this
  //
  // router.route('/').get(function(req,res){
  //  res.render("index");
  //});
  //

  router.route('/').get(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("authenticated");
  });

  router.route('/logout').get(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    var url = idm_conf.protocol + "://" + idm_conf.host + ":" + idm_conf.port;
    tokens.find(req.user.id, function (error, token) {
      var options = {
        url: url + '/oauth2/logout',
        headers: {
          'Authorization': 'bearer ' + token,
          'User-Agent': 'user-agent',
          'Content-type': 'application/json'
        }
      };
      tokens.delete(req.user.id, function () {
        req.logout();
        request.get(options, function (error, response, body) {
          console.log("status code after logging out " + response.statusCode);
          //logout in IDM too
          res.render('index');
        });
      });

    });

  });

  return router;
}
module.exports = router;
