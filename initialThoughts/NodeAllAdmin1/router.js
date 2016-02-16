'use strict';
var basicAuth       = require('basic-auth-connect');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
// var db              = require('./db');
var errorHandler    = require('errorhandler');
var express         = require('express');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var methodOverride  = require('method-override');
// var mongodb         = require('mongodb');
// var routes          = require('./routes');
var session         = require('express-session');
var dispatcherClass  = require('./dispatcher');
var dbManager  = require('./databases/dbManager');

var router = function(config) {
  // appRouter configuration
  var appRouter = express.Router();
  var dispatcher = new dispatcherClass();
  // var dbManager = new dbManagerClass();

  // if (config.useBasicAuth) {
  appRouter.use(basicAuth('admin', 'admin'));
  // }

  appRouter.use(favicon(__dirname + '/public/images/favicon.ico'));
  appRouter.use(logger('dev'));
  appRouter.use('/', express.static(__dirname + '/public'));
  appRouter.use(bodyParser.json()); // for parsing application/json
  appRouter.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  appRouter.use(cookieParser('cookiesecret'));
  appRouter.use(session({
    key:                'cookieKeyName',
    resave:             true,
    saveUninitialized:  true,
    secret:             'sessionSecret',
  }));
  appRouter.use(methodOverride(function(req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  // if (process.env.NODE_ENV === 'development') {
    appRouter.use(errorHandler());
  // }

  // view helper, sets local variables used in templates
  appRouter.all('*', function(req, res, next) {
      console.dir('This is for eveything *******');
      next();
  });

  appRouter.all('/', function(req, res, next) {
      console.dir('This is for root //////////////');

      next();
  });

  // route param pre-conditions
  appRouter.param('databaseType', function(req, res, next, databaseType) {
    console.dir('This is daabase Type-------');  
    req.databaseType = databaseType;
    req.databaseManager = dbManager.getInstance(databaseType);
    next();
  });
  appRouter.param('connectionName', function(req, res, next, connectionName) {
    console.dir('This is connectionName-------');  
    req.connectionName = connectionName;
    next();
  });
  appRouter.param('databaseName', function(req, res, next, databaseName) {
    console.dir('This is databaseName-------');  
    //For mysql databases we didnot require the specific database name to connect 
    //but, i am using this as it is, to follow the pattern
    req.databaseName = databaseName;
    req.databaseManager.connectToDatabase(req, res, next);
  });
  appRouter.param('collectionName', function(req, res, next, collectionName) {
    console.dir('This is collection Name-------');  
    req.collectionName = collectionName;
    next();
  });
  appRouter.param('methodName', function(req, res, next, methodName) {
    console.dir('This is methodName -------');  
    console.dir(methodName);
    req.methodToInvoke = methodName;
    next();
  });
  

  // routes
  appRouter.get('/', dispatcher.root);
  appRouter.get('/sendJson', dispatcher.sendJson);
  appRouter.get('/sendSchemaJson', dispatcher.sendSchemaJson);

  appRouter.post('/checkValid', dispatcher.checkValid);

  appRouter.get('/:databaseType/:methodName', dispatcher.dispatch); 
  appRouter.get('/:databaseType/:connectionName/:methodName', dispatcher.dispatch); 
  appRouter.get('/:databaseType/:connectionName/:databaseName/:methodName', dispatcher.dispatch);
  appRouter.post('/:databaseType/:connectionName/:databaseName/:methodName', dispatcher.dispatch);
  appRouter.get('/:databaseType/:connectionName/:databaseName/:collectionName/:methodName', dispatcher.dispatch);
  
  return appRouter;
};

module.exports = router;
