var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Promise = require('bluebird');

var bookshelf = require('./lib/common/common.js').bookshelf;
app.set('bookshelf', bookshelf);

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

app.use(allowCrossDomain);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));


var SnippetService = require('./lib/services/SnippetService.js');
var UserService = require('./lib/services/UserService.js');

app.get('/api/snippet', SnippetService.get);
app.post('/api/snippet', SnippetService.insert);
app.get('/api/user', UserService.listAll);
app.post('/api/user', UserService.insert);


app.listen(3000, function() {
  console.log('Express started at port 3000');
});

