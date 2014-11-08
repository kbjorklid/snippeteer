var User = require("../models/User.js");

exports.listAll = function(req, res) {
    console.log("GET");
    User.fetchAll()
        .then(function(users) {
            res.send(users.toJSON());
        }).catch(function(error) {
            console.log(error);
            res.send('Error: ' + error);
        });
};

exports.insert = function(req, res) {
    console.log("INSERT");
    Snippet.forge(req.body).save({}, {method: "insert"}).then(function() {
        res.send('ok');
    }).catch(function(error) {
            console.log(error);
            res.send('Error: ' + error);

        });
};
