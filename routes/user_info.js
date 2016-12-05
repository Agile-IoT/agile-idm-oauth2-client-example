var passport = require('passport');
var express = require('express');
var login = require('connect-ensure-login');
var tokens = require('../db/tokens');

function router(conf, router) {

  router.route('/account').get(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.send(req.user);
  });

  router.route('/token').get(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    tokens.find(req.user.id, function (error, token) {
      res.send(token);
    });
  });

  return router;
}
module.exports = router;
