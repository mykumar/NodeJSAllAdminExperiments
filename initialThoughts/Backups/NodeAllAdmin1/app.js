var express     = require('express');
var middleware  = require('./middleware');
var app         = express();
var defaultPort = 80;
var server      = app;
var config = {};

app.use('/', middleware(config));

server.listen(4000, 'localhost', function() {
  console.log('Node All Admin listening on port 4000 at localhost');
});