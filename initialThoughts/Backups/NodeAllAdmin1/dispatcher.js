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
};

module.exports = dispatcher;
