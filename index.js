// dependencies
var express = require('express');
var path = require('path');
var passport = require('passport');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var methodOverride = require('method-override');
var https = require('https');
var login = require('connect-ensure-login');
var tokens = require('./db/tokens');

//configuration for oauth2
var conf = require('./conf/oauth-client-conf');

var app = express();
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('./passport/serializer');
require('./passport/strategy')(conf);
app.use("/",require('./routes/')(conf));

//static content such as css, images, etcw
app.use("/static", express.static(path.join(__dirname, './static')));



//the login module redirects to the Oauth2 entry point in case the user is not logged in
//this endpoint uses the passport strategy used for oauth2 to show user information
app.get('/account', login.ensureLoggedIn('/auth/example/'), function (req, res) {
  console.log(JSON.stringify(req.user));
  res.send(req.user);
});

//this endpoint uses the passport strategy used for oauth2 to show user token
app.get('/token', login.ensureLoggedIn('/auth/example/'), function (req, res) {
  tokens.find(req.user.id, function(error, token){
      res.send(token);
  });
});

var options = {
  key: fs.readFileSync(conf.tls.key),
  cert: fs.readFileSync(conf.tls.cert)
};
app.listen(conf.http_port);
https.createServer(options, app).listen(conf.https_port);

console.log("listening on port "+conf.http_port+ " for http ");
console.log("listening on port "+conf.https_port+ " for https ");


module.exports = app;
