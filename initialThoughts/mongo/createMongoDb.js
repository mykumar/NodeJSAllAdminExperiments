// var Db = require('mongodb').Db, 
// Server = require('mongodb').Server;

// var db = new Db('xyz', new Server('localhost', 27017));

// db.open(function (err, db) {
//   if (err) {
//   	console.dir('ERROR we are in the callback of the open ');
//   	console.dir(err);

//   	throw err;
//   }	

//    var collection = db.collection("simple_document_insert_collection_no_safe");
//    collection.insert({hello:'world_no_safe'});

//   Use the admin database for the operation
//   var adminDb = db.admin();
//   adminDb.command({'buildInfo' : 1}, function(err, info) {
//   	console.dir('we are in the command');
//   	console.dir(err);
//   });	

//   console.dir('we are in the callback of the open');
//   db.close();
 
// });

/* 
	Create database, create collection and drop collection
*/
// var adminuser = "admin";
// var adminpass = "admin";
// var server = "localhost";
// var port   = 27017; 
// var dbName = "mysexy";
// var mongodb          = require('mongodb');
// var mongoClient = mongodb.MongoClient;
// var connString = "mongodb://"+server+":"+port+"/"+dbName;

// mongoClient.connect(connString, function(err, db) {
//     console.dir(err);
//     if(!err) {
//     	var collection = db.collection("simple_document_insert_collection_no_safe");
//     	collection.insert({hello:'world_no_safe'});
//     	collection.drop();

//     }
//     else{
//         console.log("Mongo DB could not be connected");
//         process.exit(0);
//     }
//     db.close();
// });
/* 
	Drop database 
*/
// var MongoClient = require('mongodb').MongoClient;
// MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
// 	db.dropDatabase().then(function(result) {
// 		console.dir('we are in the drop database');
// 		console.dir(result);
// 	});

// 	setTimeout(db.admin().listDatabases().then(function(dbs) {
//       	// Grab the databases
//         dbs = dbs.databases;
//         for(var i = 0; i < dbs.length; i++) {
//             console.dir(dbs[i].name);
//         }
//         // db.close();
// 	}), 2000);

// });			

