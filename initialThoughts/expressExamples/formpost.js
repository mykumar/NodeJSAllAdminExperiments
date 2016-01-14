var express = require('express');

var app = express(); // the main app
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.multipart());

app.param('intidata', function(req, res, next, name) {
	console.dir('i am in intidata');
	console.dir(name);
	var user_id = req.param('id');
	var token = req.param('token');
	var geo = req.param('geo');  

	console.dir(user_id);
	console.dir(token);
	console.dir(geo);
	next();
});
app.post('/postJsonData', function (req, res) {
	console.log('I am in postData'); // /admin
	console.dir(req.params);
	console.dir(req.body);
	console.dir(req.query);
	res.send('I got the drinks');
});	
app.post('/postData', function (req, res) {
	console.log('I am in postData'); // /admin
	console.dir(req.params);
	console.dir(req.body);
	console.dir(req.query);
	var user_id = req.param('id');
	var token = req.param('token');
	var geo = req.param('geo');  
	var sendData = 'This is post data u sent' + user_id + ' ' + token + ' ' + geo;
	res.send(sendData);
});

app.get('/:intidata/getData', function (req, res) {
	console.log('I am in app /'); // /admin
	console.dir(req.params);
	console.dir(req.body);
	console.dir(req.query);
	var user_id = req.param('id');
	var token = req.param('token');
	var geo = req.param('geo');  

	res.send(user_id + ' ' + token + ' ' + geo);
});

app.listen(3000);
