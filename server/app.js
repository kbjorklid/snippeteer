var express = require('express');
var app = express();
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Promise = require('bluebird');

var bookshelf = require('./lib/common/common.js').bookshelf;
app.set('bookshelf', bookshelf);

var auth = require('./lib/common/auth');

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

app.use(morgan('dev'));
app.use(cookieParser());
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(passport.initialize());


var SnippetService = require('./lib/services/SnippetService.js');
var UserService = require('./lib/services/UserService.js');
var router = express.Router();


router.route('/snippet')
    .get(auth.isAuthenticated, SnippetService.get)
    .post(auth.isAuthenticated, SnippetService.insert);
router.route('/user')
    .get(auth.isAuthenticated, UserService.listAll)
    .post(UserService.insert);
app.use('/api', router);

app.listen(3000, function() {
  console.log('Express started at port 3000');
});

