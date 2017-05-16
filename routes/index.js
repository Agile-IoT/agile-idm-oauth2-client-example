var passport = require('passport');
var express = require('express');
var login = require('connect-ensure-login');
var tokens = require('../db/tokens');

function router(conf, idm_conf) {
  var router = express.Router();
  require('./oauth2-client')(conf, idm_conf, router);
  require('./user_info')(conf, router);
  require('./users')(conf, idm_conf, router);
  require('./entities')(conf, idm_conf, router);
  require('./groups')(conf, idm_conf, router);
  require('./list')(conf, idm_conf, router);

  return router;
}
module.exports = router;
