var passport = require('passport');
var express = require('express');
var login = require('connect-ensure-login');
var tokens = require('../db/tokens');
var querystring = require('querystring');
var request = require('request');
var util = require('./util');

function router(conf, idm_conf, router) {

  var url = idm_conf.protocol + "://" + idm_conf.host + ":" + idm_conf.port + "/api/v1"

  /*
   reading user
  */
  router.route('/read_user').get(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("find_user", {
      "action": "read"
    });
  });

  router.route('/read_user').post(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    var action = "read user";
    //first we read the token
    tokens.find(req.user.id, function (error, accesstoken) {
      var query = querystring.stringify({
        "auth_type": req.body.auth_type,
        "user_name": req.body.user_name
      });
      //build http options
      var options = {
        url: url + '/user/?' + query,
        headers: {
          'Authorization': 'bearer ' + accesstoken,
          'User-Agent': 'user-agent',
          'Content-type': 'application/json'
        }
      };
      //send request
      /*
       the render view expects  an object called result with the format:
        {"result":[{"label":"label1","value":"value1"},{"label":"label2","value":"value2"},...],"action":"type of action"};
       so here we build it properly with utils and passing the action type.
      */
      request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          try {
            var result = JSON.parse(body);
            res.render('result', {
              "result": util.formatOutput(result),
              "action": action
            });

          } catch (error) {
            res.render('result', {
              "result": [{
                "label": "error",
                "value": "unexpected result from IDM  endpoint " + error
              }],
              "action": action
            });
          }
        } else if (!error) {
          res.render('result', {
            "result": [{
              "label": "error",
              "value": "unexpected status code from IDM  endpoint :" + response.statusCode + "error:" + response.body
            }],
            "action": action
          });
        } else {
          res.render('result', {
            "result": [{
              "label": "error",
              "value": "unexpected result from IDM  endpoint " + error
            }],
            "action": action
          });
        }
      });
    });
  });

  /*
    creating user
  */
  router.route('/create_user').get(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("create_user");
  });

  router.route('/create_user').post(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    var action = "create user";
    //first we read the token
    tokens.find(req.user.id, function (error, accesstoken) {
      var user = {
        "auth_type": req.body.auth_type,
        "user_name": req.body.user_name,
        "role": req.body.role
      };
      if (req.body.password) {
        user.password = req.body.password;
      }
      //build http options
      var options = {
        url: url + '/user/',
        body: JSON.stringify(user),
        headers: {
          'Authorization': 'bearer ' + accesstoken,
          'User-Agent': 'user-agent',
          'Content-type': 'application/json'
        }
      };
      //send request
      /*
       the render view expects  an object called result with the format:
        {"result":[{"label":"label1","value":"value1"},{"label":"label2","value":"value2"},...],"action":"type of action"};
       so here we build it properly with utils and passing the action type.
      */
      request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          try {
            var result = JSON.parse(body);
            res.render('result', {
              "result": util.formatOutput(result),
              "action": action
            });

          } catch (error) {
            res.render('result', {
              "result": [{
                "label": "error",
                "value": "unexpected result from IDM  endpoint " + error
              }],
              "action": action
            });
          }
        } else if (!error) {
          res.render('result', {
            "result": [{
              "label": "error",
              "value": "unexpected status code from IDM  endpoint :" + response.statusCode + "response:" + response.body
            }],
            "action": action
          });
        } else {
          res.render('result', {
            "result": [{
              "label": "error",
              "value": "unexpected result from IDM  endpoint " + error
            }],
            "action": action
          });
        }
      });
    });

  });

  /*
    deleting user
  */
  router.route('/delete_user').get(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("find_user", {
      "action": "delete"
    });
  });

  //deleting the user...
  router.route('/delete_user').post(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    var action = "delete user";
    //first we read the token
    tokens.find(req.user.id, function (error, accesstoken) {
      var query = querystring.stringify({
        "auth_type": req.body.auth_type,
        "user_name": req.body.user_name
      });
      //build http options
      var options = {
        url: url + '/user/?' + query,
        headers: {
          'Authorization': 'bearer ' + accesstoken,
          'User-Agent': 'user-agent',
          'Content-type': 'application/json'
        }
      };
      //send request
      /*
       the render view expects  an object called result with the format:
        {"result":[{"label":"label1","value":"value1"},{"label":"label2","value":"value2"},...],"action":"type of action"};
       so here we build it properly with utils and passing the action type.
      */
      request.delete(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          try {
            res.render('result', {
              "result": [{
                "value": "user deleted successfully",
                "label": "result"
              }],
              "action": action
            });

          } catch (error) {
            res.render('result', {
              "result": [{
                "label": "error",
                "value": "unexpected result from IDM  endpoint " + error
              }],
              "action": action
            });
          }
        } else if (!error) {
          res.render('result', {
            "result": [{
              "label": "error",
              "value": "unexpected status code from IDM  endpoint :" + response.statusCode + "error:" + response.body
            }],
            "action": action
          });
        } else {
          res.render('result', {
            "result": [{
              "label": "error",
              "value": "unexpected result from IDM  endpoint " + error
            }],
            "action": action
          });
        }
      });
    });
  });
  return router;
}
module.exports = router;
