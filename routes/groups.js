var passport = require('passport');
var express = require('express');
var login = require('connect-ensure-login');
var querystring = require('querystring');
var request = require('request');
var tokens = require('../db/tokens');
var util = require ('./util');

function router(conf, idm_conf, router) {

    var url = idm_conf.protocol + "://" + idm_conf.host + ":" +idm_conf.port + "/api/v1"
    /*
     reading user
    */
    router.route('/read_group').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
      res.render("find_group",{"action":"read"});
    });

    router.route('/read_group').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
      var action = "read group";
      //first we read the token
      tokens.find(req.user.id, function(error, accesstoken){
        var owner = req.body.owner+"!@!"+req.body.auth_type;
        var group_name =  req.body.group_name;
        //build http options
        var options = {
          url: url + '/user/'+owner+'/group/'+group_name,
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
              res.render('result',{"result":util.formatOutput(result),"action":action});

            } catch (error) {
              res.render('result',{"result":[{"label":"error","value":"unexpected result from IDM  endpoint "+error}],"action":action});
            }
          } else if (!error) {
              res.render('result',{"result":[{"label":"error","value":"unexpected status code from IDM  endpoint :"+response.statusCode+ "error:"+  response.body}],"action":action});
          } else {
            res.render('result',{"result":[{"label":"error","value":"unexpected result from IDM  endpoint "+error}],"action":action});
          }
        });
      });
    });

    /*
      creating user
    */
    router.route('/create_group').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
      res.render("create_group");
    });


    router.route('/create_group').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
      var action = "read group";
      //first we read the token
      tokens.find(req.user.id, function(error, accesstoken){
        var body = {"group_name": req.body.group_name};
        //build http options
        var options = {
          url: url + '/group/',
          body : JSON.stringify(body),
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
              res.render('result',{"result":util.formatOutput(result),"action":action});

            } catch (error) {
              res.render('result',{"result":[{"label":"error","value":"unexpected result from IDM  endpoint "+error}],"action":action});
            }
          } else if (!error) {
              res.render('result',{"result":[{"label":"error","value":"unexpected status code from IDM  endpoint :"+response.statusCode+ "error:"+  response.body}],"action":action});
          } else {
            res.render('result',{"result":[{"label":"error","value":"unexpected result from IDM  endpoint "+error}],"action":action});
          }
        });
      });

    });
    /*
      deleting user
    */
    router.route('/delete_group').get( login.ensureLoggedIn('/auth/example/'), function (req, res) {
      res.render("find_group",{"action":"delete"});
    });


    router.route('/delete_group').post( login.ensureLoggedIn('/auth/example/'), function (req, res) {
      var action = "delete group";
      //first we read the token
      tokens.find(req.user.id, function(error, accesstoken){
        var owner = req.body.owner+"!@!"+req.body.auth_type;
        var group_name =  req.body.group_name;
        //build http options
        var options = {
          url: url + '/user/'+owner+'/group/'+group_name,
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
              res.render('result',{"result":[{"label":"result","value":"group deleted successfully"}],"action":action});

            } catch (error) {
              res.render('result',{"result":[{"label":"error","value":"unexpected result from IDM  endpoint "+error}],"action":action});
            }
          } else if (!error) {
              res.render('result',{"result":[{"label":"error","value":"unexpected status code from IDM  endpoint :"+response.statusCode+ "error:"+  response.body}],"action":action});
          } else {
            res.render('result',{"result":[{"label":"error","value":"unexpected result from IDM  endpoint "+error}],"action":action});
          }
        });
      });

    });
    return router;

};
module.exports = router;
