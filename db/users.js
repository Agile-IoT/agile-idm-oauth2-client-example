var users = {};
//id is a string...
exports.find = function (id, done) {
  if (users[id]) {
    return done(null, users[id]);
  } else {
    return done(null, null);
  }
};

exports.findOrCreate = function (id, user, done) {
  if (users[id])
    return done(null, users[id]);
  users[id] = user;
  return done(null, users[id]);
};
