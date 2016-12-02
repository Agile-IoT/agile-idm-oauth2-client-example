var passport = require('passport');
var express = require('express');
var login = require('connect-ensure-login');
var tokens = require('../db/tokens');

function router(conf, router) {

  /*
    reading entity
  */
  router.route('/read_entity').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("find_entity",{"action":"read"});
  });

  router.route('/read_entity').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render('result',{"result":[{"label":"stuff","value":"thing"}],"action":"read entity"});
  });

  /*
    creating entity
  */
  router.route('/create_entity').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("create_entity");
  });

  router.route('/create_entity').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render('result',{"result":[{"label":"stuff","value":"thing"}],"action":"create entity"});
  });

  /*
    deleting entity
  */
  router.route('/delete_entity').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("find_entity",{"action":"delete"});
  });

  router.route('/delete_entity').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render('result',{"result":[{"label":"stuff","value":"thing"}],"action":"delete entity"});
  });

  /*
    looking up entity by attribute
  */
  router.route('/read_entity').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("find_entity",{"action":"read"});
  });

  router.route('/search_entity').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("search_entity");
  });

  router.route('/search_entity').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render('result',{"result":[{"label":"stuff","value":"thing"}],"action":"look up entity"});
  });


  return router;
}
module.exports = router;
