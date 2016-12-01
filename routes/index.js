var passport = require('passport');
var express = require('express');
var login = require('connect-ensure-login');
var tokens = require('../db/tokens');

function router(conf) {
  var router = express.Router();
  require('./oauth2-client')(conf,router);
  require('./user_info')(conf,router);

  return router;
}
module.exports = router;
