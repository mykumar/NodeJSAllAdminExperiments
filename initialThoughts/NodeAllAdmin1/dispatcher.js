'use strict';

var dispatcher = function(req, res, next) {
    // console.dir('This is dispatcher');

    // if(req.databaseType == 'mysql') {
    // 	req.databaseManager.waitforLaunchFiber(req, res, req.methodToInvoke);
    // } else {
    // 	req.databaseManager[req.methodToInvoke](req, res);
    // }	
    // res.send('Ok baby i am in the middleware and i am sending response');
    // next();
};

dispatcher.prototype.root= function(req, res, next) {
	console.dir('This is root-------------------------------------');
	res.sendFile(__dirname + '/public/genetheme/index.html');
};
dispatcher.prototype.sendJson= function(req, res, next) {
    console.dir('This is sendJson-------------------------------------');
    res.sendFile(__dirname + '/testJson.json');
    // res.sendFile(__dirname + '/public/genetheme/index.html');
};
dispatcher.prototype.sendSchemaJson = function(req, res, next) {
    console.dir('This is sendJson-------------------------------------');
    res.sendFile(__dirname + '/testSchemaData.json');
    // res.sendFile(__dirname + '/public/genetheme/index.html');
};
dispatcher.prototype.checkValid = function(req, res, next) {
    console.dir('This is checkValid-------------------------------------');
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;
    //console.dir(req);
    console.log(req.param);
    console.log(req.param.id);
    console.dir(req.body);
    console.dir(req.body.id);
    console.dir(req.body.token);
    console.dir(req.body.geo);

    res.send(user_id + ' ' + token + ' ' + geo);
};    

dispatcher.prototype.dispatch = function(req, res, next) {
	console.dir('This is dispatcher- dispatch');
	// if(req.databaseType == 'mysql') {
 //    	req.databaseManager.waitforLaunchFiber(req, res, req.methodToInvoke);
 //    } else {
    	req.databaseManager[req.methodToInvoke](req, res);
    // }	
};	

module.exports = dispatcher;
