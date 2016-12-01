var passport = require('passport');
var express = require('express');
var login = require('connect-ensure-login');
var tokens = require('../db/tokens');

function router(conf, router) {


  router.route('/read_user').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("read_user");
  });


  router.route('/read_user').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render('result',{"result":[{"label":"stuff","value":"thing"}],"action":"read user"});
  });

  router.route('/create_user').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("create_user");
  });


  router.route('/create_user').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render('result',{"result":[{"label":"stuff","value":"thing"}],"action":"create user"});
  });


  return router;
}
module.exports = router;
