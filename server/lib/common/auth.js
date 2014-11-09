// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/User');
var bcrypt = require("bcrypt-nodejs");


var validPassword = function (password, user) {
    return  bcrypt.compareSync(password, user.get('password'));
}

passport.use(new BasicStrategy(
  function(email, password, callback) {
      User.where('email', email)
          .fetch()
          .then(function(user){
            if (user && validPassword(password, user)) {
                return callback(null, user);
            } else {
                return callback(null, false);
            }
          }).catch(function(error) {
              return callback(null, false);
          });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });