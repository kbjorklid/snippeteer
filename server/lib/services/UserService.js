var User = require("../models/User.js");
var bcrypt = require("bcrypt-nodejs");

exports.listAll = function(req, res) {
    User.fetchAll()
        .then(function(users) {
            res.send(users.toJSON());
        }).catch(function(error) {
            console.log(error);
            res.send('Error: ' + error);
        });
};

exports.insert = function(req, res) {
    var userData = req.body;
    userData.password = generateHash(userData.password);
    User.forge(req.body).save({}, {method: "insert"}).then(function() {
        res.send('ok');
    }).catch(function(error) {
            console.log(error);
            res.send('Error: ' + error);

        });
};

exports.findById = function (req, res) {
    var user_id = req.params.id;
    new User().where('id', user_id)
        .fetch()
        .then(function(user){
            res.send(user.toJSON());
        }).catch(function(error){
            res.send('Error: ' + error);
        });
}

var generateHash = function (password) {
    console.log("x");
    var result =  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    console.log("y");
    return result;
}
