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
var dbInstance = null;

mongoClient.connect(connString, function(err, db) {
    console.dir(err);
    if(!err) {
    	var collectionName = "employee";
        var mainVariable = "This is mainVariable baby";
        dbInstance = db;
    	//create collection
        getAllDocumentsFromCollection(collectionName);    	

    }
    else{
        console.log("Mongo DB could not be connected");
        process.exit(0);
    }
});

var closeDb = function()
{
    dbInstance.close();
};

var getAllDocumentsFromCollection = function(collectionName) {
    dbInstance.collection(collectionName).find({}).toArray(function (err, docs) {
          console.dir(err);
          console.dir(docs);
          console.dir(docs[0]._id.toString());
          console.dir(docs[0]._id.toHexString());
            closeDb();
        });
}