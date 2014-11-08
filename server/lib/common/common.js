var dbConfig = {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'snip',
        password: 'snip',
        database: 'snip',
        charset: 'utf8'
    }
};

var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
console.log("common.js");

exports.bookshelf = bookshelf;
