
var Db = require('mongodb').Db,
Mongos = require('mongodb').Mongos,
Server = require('mongodb').Server;
var mongoDbManager = function() {
	this.server = null;
	this.database = null;
	this.defaultDatabaseName = 'admin';
}
mongoDbManager.prototype.init = function(req,res) {
	this.server = new Server('localhost', 27017);
	this.database = new Db(this.defaultDatabaseName, new Mongos([this.server]));
	this.database.open(function(err, db) {
		if(err) {
			res.send('we got error');
		}
		console.dir('I am here babaty');
		res.send('we are succefssfully connected');
	});	
};


// test = require('assert');
// // Connect using Mongos
// var server = new Server('localhost', 27017);
// var dbs = new Db('admin', new Mongos([server]));
// dbs.open(function(err, db) {
//   // Get an additional db
//   // db.close();
//   	console.dir('i am in open');

//   	db.admin().listDatabases().then(function(dbs) {
// //       	// Grab the databases
// 		console.dir('i am in listDatabases');
// 	    dbs = dbs.databases;
// 	    for(var i = 0; i < dbs.length; i++) {
// 	        console.dir(dbs[i].name);
// 	    }
// 	    //console.dir(dbs);    
// 		db.close();
// 	});        

// });

module.exports = mongoDbManager;