var tokens = {};
//id is a string...
exports.find = function (id, done) {
  if (tokens[id]) {
    return done(null, tokens[id]);
  } else {
    return done(null, null);
  }
};

exports.create = function (id, token, done) {
  tokens[id] = token;
  return done(null, tokens[id]);
};

exports.delete = function (id, done) {
  delete tokens[id];
  done();
}
