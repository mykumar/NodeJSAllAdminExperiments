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
dispatcher.prototype.dispatch= function(req, res, next) {
	console.dir('This is dispatcher- dispatch');
	if(req.databaseType == 'mysql') {
    	req.databaseManager.waitforLaunchFiber(req, res, req.methodToInvoke);
    } else {
    	req.databaseManager[req.methodToInvoke](req, res);
    }	
};	

module.exports = dispatcher;
