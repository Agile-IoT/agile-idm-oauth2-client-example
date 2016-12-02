var passport = require('passport');
var express = require('express');
var login = require('connect-ensure-login');
var tokens = require('../db/tokens');

function router(conf, router) {

    /*
     reading user
    */
    router.route('/read_group').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
      res.render("find_group",{"action":"read"});
    });

    router.route('/read_group').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
      res.render('result',{"result":[{"label":"stuff","value":"thing"}],"action":"read user"});
    });

    /*
      creating user
    */
    router.route('/create_group').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
      res.render("create_group");
    });


    router.route('/create_group').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
      res.render('result',{"result":[{"label":"stuff","value":"thing"}],"action":"create group"});
    });

    /*
      deleting user
    */
    router.route('/delete_group').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
      res.render("find_group",{"action":"delete"});
    });


    router.route('/delete_group').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
      res.render('result',{"result":[{"label":"stuff","value":"thing"}],"action":"delete group"});
    });
    return router;

}
module.exports = router;
