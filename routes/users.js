var passport = require('passport');
var express = require('express');
var login = require('connect-ensure-login');
var tokens = require('../db/tokens');

function router(conf, router) {

  /*
   reading user
  */
  router.route('/read_user').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("find_user",{"action":"read"});
  });

  router.route('/read_user').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render('result',{"result":[{"label":"stuff","value":"thing"}],"action":"read user"});
  });

  /*
    creating user
  */
  router.route('/create_user').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("create_user");
  });


  router.route('/create_user').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render('result',{"result":[{"label":"stuff","value":"thing"}],"action":"create user"});
  });

  /*
    deleting user
  */
  router.route('/delete_user').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("find_user",{"action":"delete"});
  });


  router.route('/delete_user').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render('result',{"result":[{"label":"stuff","value":"thing"}],"action":"delete "});
  });
  return router;
}
module.exports = router;
