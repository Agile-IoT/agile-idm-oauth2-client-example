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
require('./passport/strategy')(conf.oauth2);
app.use("/",require('./routes/')(conf.oauth2));

//static content such as css, images, etcw
app.use("/static", express.static(path.join(__dirname, './static')));





var options = {
  key: fs.readFileSync(conf.site.tls.key),
  cert: fs.readFileSync(conf.site.tls.cert)
};
app.listen(conf.site.http_port);
https.createServer(options, app).listen(conf.site.https_port);

console.log("listening on port "+conf.site.http_port+ " for http ");
console.log("listening on port "+conf.site.https_port+ " for https ");


module.exports = app;
