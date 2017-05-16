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
    reading entity
  */
  router.route('/read_entity').get(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("find_entity", {
      "action": "read"
    });
  });

  router.route('/read_entity').post(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    var action = "read entity";
    //first we read the token
    tokens.find(req.user.id, function (error, accesstoken) {
      var entity_type = req.body.entity_type;
      var entity_id = req.body.entity_id;

      //build http options
      var options = {
        url: url + '/entity/' + entity_type + '/' + entity_id,
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
    creating entity
  */
  router.route('/create_entity').get(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("create_entity");
  });

  router.route('/create_entity').post(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    //first we read the token
    tokens.find(req.user.id, function (error, accesstoken) {
      var entity = util.buildEntityFromAttributes(req.body.attribute_name, req.body.attribute_value);
      var entity_type = req.body.entity_type;
      var entity_id = req.body.entity_id;
      var action = "create entity";
      console.log("registering entity " + JSON.stringify(entity));
      //build http options
      var options = {
        url: url + '/entity/' + entity_type + '/' + entity_id,
        body: JSON.stringify(entity),
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
    deleting entity
  */

  /*
    deleting entity
  */
  router.route('/delete_entity').get(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("find_entity", {
      "action": "delete"
    });
  });

  router.route('/delete_entity').post(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    var action = "delete entity";
    //first we read the token
    tokens.find(req.user.id, function (error, accesstoken) {
      var entity_type = req.body.entity_type;
      var entity_id = req.body.entity_id;

      //build http options
      var options = {
        url: url + '/entity/' + entity_type + '/' + entity_id,
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
                "value": "entity deleted successfully",
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

  /*
    looking up entity by attribute
  */
  router.route('/search_entity').get(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("search_entity");
  });

  router.route('/search_entity').post(login.ensureLoggedIn('/auth/example/'), function (req, res) {

    //first we read the token
    tokens.find(req.user.id, function (error, accesstoken) {
      var criteria = util.buildCriteria(req.body.attribute_name, req.body.attribute_value);
      var action = "look up entity";
      console.log("looking for criteria " + JSON.stringify(criteria));
      //build http options
      var options = {
        url: url + '/entity/search/',
        body: JSON.stringify({
          "criteria": criteria
        }),
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
  router.route('/delete_attribute_entity').get(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("delete_attribute");
  });

  router.route('/delete_attribute_entity').post(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    //first we read the token
    tokens.find(req.user.id, function (error, accesstoken) {
      var entity_type = req.body.entity_type;
      var entity_id = req.body.entity_id;
      var attribute_name = req.body.attribute_name;
      var action = "delete entity attribute";

      //build http options
      var options = {
        url: url + '/entity/' + entity_type + '/' + entity_id + '/attribute/' + attribute_name,
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
    setting attribute for entity
  */
  router.route('/set_attribute_entity').get(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    res.render("set_attribute");
  });

  router.route('/set_attribute_entity').post(login.ensureLoggedIn('/auth/example/'), function (req, res) {
    //first we read the token
    tokens.find(req.user.id, function (error, accesstoken) {
      var setter = {
        "value": req.body.attribute_value
      };
      var entity_type = req.body.entity_type;
      var entity_id = req.body.entity_id;
      var attribute_name = req.body.attribute_name;
      var attribute_value = req.body.attribute_value;
      var action = "set entity attribute";

      //build http options
      var options = {
        url: url + '/entity/' + entity_type + '/' + entity_id + '/attribute/' + attribute_name,
        body: JSON.stringify(setter),
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
      request.put(options, function (error, response, body) {
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
  return router;
}
module.exports = router;
