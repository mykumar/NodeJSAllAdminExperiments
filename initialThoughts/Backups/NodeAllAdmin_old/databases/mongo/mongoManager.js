var mongoManager = function() {
	var dsClass = require('./lib/datastructure');
	this.ds =  new dsClass();
	this.mongodb = require('mongodb');
	this.mongoClient = this.mongodb.MongoClient;
	this.DB = null;
	this.adminDB = null;
}
mongoManager.prototype.getConnectionParameters= function(connectionName) {
	//Get the connection parametrs using this name 'connectionName'
	return {
				name :  'connection', 
				adminuser : "admin",
				adminpass : "admin",
				server : "localhost",
				port   : 27017, 
				dbName : "myNewCreation"
			};
}
mongoManager.prototype.init = function(val) {
}	
mongoManager.prototype.createConnectionString= function(dataBaseName,connectionName) {
	console.dir('This is createConnectionString');
	var connectionParams = this.getConnectionParameters(connectionName);
	this.ds.createConnection(connectionParams);
	var str = JSON.stringify(this.ds);
	console.dir(str);		  	
	if (dataBaseName != undefined) {
		connectionParams.dbName = dataBaseName;		
	}
	var connString = "mongodb://"+connectionParams.server+":"+connectionParams.port+"/"+connectionParams.dbName;
	return connString;
}
mongoManager.prototype.connectToDatabase= function(req, res,callback) {
	console.dir('This is connectToDatabase');
	var connString = this.createConnectionString(req.databaseName,req.connectionName);	
	var that = this;
	this.mongoClient.connect(connString, function(err, db) {
		if(err) {
			console.dir('we got the error in the mongo DB connect');
			console.dir(err);
		}
		that.DB = db;
		that.adminDB = db.admin();
		if(callback) { callback(); }
	});	
}
mongoManager.prototype.listAllDatabases = function(req, res) {
	var that = this;
	this.adminDB.listDatabases(function(err, dbs) {
	    if(err) {
			console.dir('we got the error in the mongo DB listAllDatabases');
			console.dir(err);
		}
		console.dir('This is the listAllDatabases======================');
		console.dir(dbs.databases);
		that.ds.createDatabases(dbs.databases);
		var returnString = dbs.databases + "    This is return data";
		res.send(returnString);
	});
}
mongoManager.prototype.getAllDocumentsFromCollection = function(req, res) {
	this.DB.collection(req.collectionName).find({}).toArray(function (err, docs) {
		console.dir('-----------This is getAllDocumentsFromCollection--------');
		console.dir(err);
		console.dir(docs);
		console.dir(docs[0]._id.toString());
		console.dir(docs[0]._id.toHexString());
		res.send(JSON.stringify(docs));
    });
}
mongoManager.prototype.getDsData = function(req,res) {
	var str = JSON.stringify(this.ds);		  
	res.send(str);	
}
mongoManager.prototype.emptyDS = function(req,res) {
	this.ds.emptyDS();
}	
mongoManager.prototype.init = function() {
	console.dir('we are in the init of the mongoManager');
}
mongoManager.prototype.select = function(req, res) {
	console.dir('we are in the ++++SELECT++++ of the mongoManager');
	var connectionParams = {};
	connectionParams.name =  'Connection'; 
	connectionParams.ip =  '127.0.0.1';
	connectionParams.port =  '27071';
	var databaseParams = {};
	databaseParams.name =  'local'; 
	var collectionParams = {};
	collectionParams.name =  'myCol'; 

	this.ds.createConnection(connectionParams)
		  .createDatabase(databaseParams )
		  .createCollection(collectionParams );

	var str = JSON.stringify(this.ds);		  
	res.send(str);
}

module.exports = mongoManager;