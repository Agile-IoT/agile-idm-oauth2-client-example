var passport = require('passport');
var express = require('express');
var login = require('connect-ensure-login');


function router(conf) {
  var router = express.Router();
  /*
   Routes for Oauth2 endpoint as client
  */
  router.route('/auth/example').get(passport.authenticate('oauth2'));

  router.route('/auth/example/callback').get(passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    res.render('authenticated');
    //res.redirect('/');
  });

  /* index */
  router.route('/').get(function(req,res){
    res.render("index");
  });


  return router;
}
module.exports = router;
