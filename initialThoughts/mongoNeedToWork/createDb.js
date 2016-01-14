/* 
	Create database, create collection and drop collection
*/
var adminuser = "admin";
var adminpass = "admin";
var server = "localhost";
var port   = 27017; 
var dbName = "myNewCreation";
var mongodb          = require('mongodb');
var mongoClient = mongodb.MongoClient;
var connString = "mongodb://"+server+":"+port+"/"+dbName;

mongoClient.connect(connString, function(err, db) {
    console.dir(err);
    if(!err) {
    	var collectionName = "One Simple Collection";
    	//create collection
    	var collection = db.collection(collectionName);
    	//insert into collection
    	collection.insert({hello:'world_no_safe'});
    	// remove documents from collections
    	collection.remove({},function(err,removed) {
        		console.log(" %s documents", removed);
        });
    	//drop collections
        db.dropCollection(collectionName, function(err, result) {
          	console.dir('Collection is dropped' );
          	console.dir(result);
        });  
    }
    else{
        console.log("Mongo DB could not be connected");
        process.exit(0);
    }
    db.close();
});