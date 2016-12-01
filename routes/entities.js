var passport = require('passport');
var express = require('express');
var login = require('connect-ensure-login');
var tokens = require('../db/tokens');

function router(conf, router) {


  router.route('/read_entity').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("read_entity");
  });

  router.route('/read_entity').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render('result',{"result":[{"label":"stuff","value":"thing"}],"action":"read entity"});
  });

  router.route('/create_entity').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("create_entity");
  });


  router.route('/create_entity').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render('result',{"result":[{"label":"stuff","value":"thing"}],"action":"create entity"});
  });



  return router;
}
module.exports = router;
