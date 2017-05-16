module.exports = {
  "oauth2": {
    authorizationURL: 'http://localhost:3000/oauth2/dialog/authorize',
    tokenURL: 'http://localhost:3000/oauth2/token',
    clientID: "MyAgileClient2",
    clientSecret: "Ultrasecretstuff",
    callbackURL: "http://localhost:3002/auth/example/callback",
    userInfoUrl: 'http://localhost:3000/oauth2/api/userinfo'
  },
  "site": {
    "tls": {
      "key": "./certs/server.key",
      "cert": "./certs/server.crt"
    },
    "https_port": 1445,
    "http_port": 3002
  },
  "idm": {
    "host": "localhost",
    "port": 3000,
    "protocol": "http"
  }
};
