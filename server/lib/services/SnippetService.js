
var Snippet = require("../models/Snippet.js");

exports.get = function(req, res) {
    console.log("GET");
    Snippet.fetchAll()
        .then(function(snippets) {
            res.send(snippets.toJSON());
        }).catch(function(error) {
            console.log(error);
            res.send('An error occured');
        });
};

exports.insert = function(req, res) {
    console.log("INSERT");
    Snippet.forge(req.body).save({}, {method: "insert"}).then(function() {
        res.send('ok');
    }).catch(function(error) {
            console.log(error);
            res.send('An error occurred');

        });
};



/*
module.exports = function (route, app) {
    var Snippet = require("../models/Snippet.js")(app);

    route.get(function(req, res) {
        Snippet.fetchAll()
            .then(function(snippets) {
                res.send(snippets.toJSON());
            }).catch(function(error) {
                console.log(error);
                res.send('An error occured');
            });

    });




    route.post(function(req, res) {
        Snippet.forge(req.body).save({}, {method: "insert"}).then(function() {
            res.send('ok');
        }).catch(function(error) {
                console.log(error);
                res.send('An error occurred');

            });
    });
};
*/
