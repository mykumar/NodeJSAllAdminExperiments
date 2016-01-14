var express = require('express');
var app = express();
var router = express.Router();

var mongoDbClass = require('./mongoDbManager'); 
var mongo = new mongoDbClass();   
app.param('databaseType', function(req, res, next, databaseType) {
	console.dir('I am in the databaseType');
	console.dir(databaseType);
	req.databaseType = databaseType;
	next();
});
app.param('databaseName', function(req, res, next, databaseName) {
	console.dir('I am in the databaseName');
	console.dir('I am printing the databaseType');
	console.dir(req.databaseType);
	console.dir(databaseName);
	next();
});	
var middle = function(req, res, next) {
	console.dir('This is the middleware');
	console.dir(req.url);
	var async = require("async");
	async.waterfall([
		  function(callback){
		    console.dir('async 1');
		    callback(null, 'one', 'two');
		  },
		  function(arg1, arg2, callback){
		  	console.dir('async 2');
		    callback(null, 'three');
		  },
		  function(arg1, callback){
		    // arg1 now equals 'three' 
		    console.dir('async 3');
		    var done = function done(error, result) {
			  console.log("map completed. Error: ", error, " result: ", result);
			};
 
			async.map([1,2,3,4,5], addOne, done(callback));

		    callback(null, 'done');
		  }
	], function (err, result) {
	  // result now equals 'done' 
	  	console.dir('async result is ' + result);
	  	next();
	});
};
app.get('/user/abc/:databaseType/:databaseName', middle, function(req,res){
      console.dir('This is the app get');
      res.send('I am sending from the mongo');
      res.end();
});
app.listen(4000);
// a middleware function with no mount path. This code is executed for every request to the router
// router.use(function (req, res, next) {
// 	console.log('Time:', Date.now());
// 	console.dir('we in the 1 st ');
// 	next();
// });

// router.param('id', function(req, res, next) {
// 	console.dir('we are in the id ');
// 	console.dir(req.params.id);
// 	abc(next);
// 	// console.dir('we got back from the abc function ');
// 	// next();
// });
// function abc(next){
// 	 console.dir('we are in the functions ');
// 	 console.dir(next);
// 	 next();
// }
// // a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
// router.use('/user/:id', function(req, res, next) {
//   console.log('Request URL:', req.originalUrl);
//   console.dir('we in the 2 nd 1111 ');
//   next();
//   // next('route');
// }, function (req, res, next) {
//   console.log('Request Type:', req.method);
//   console.dir('we in the 2 nd 22222 ');
//   next();
//   // res.send('we in the 2 rd 222 ');
// });
// var middle = function(req, res, next) {
// 	console.dir('This is the miidle');
// 	next();
// };
// // a middleware sub-stack that handles GET requests to the /user/:id path
// router.get('/user/:id', middle,  function (req, res, next) {
//   console.dir('we in the 3 rd 1111111'); 		
//   // if the user ID is 0, skip to the next router
//   // if (req.params.id == 0) 
//   	next('route');
//   	// next();
//   // otherwise pass control to the next middleware function in this stack
//   // else next(); //
// }, function (req, res, next) {
//   // render a regular page
//   console.dir('we in the 3 rd 22222222222 ');
//   res.send('we in the 3 rd ');
//   // next();
// });
// // handler for the /user/:id path, which renders a special page
// router.get('/user/:id', function (req, res, next) {
//   console.log(req.params.id);
//   console.dir('we in the last ');
//   res.send('special');
// });
// // mount the router on the app
// app.use('/', router);
