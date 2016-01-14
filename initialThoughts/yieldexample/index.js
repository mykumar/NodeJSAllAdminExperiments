var wait = require('wait.for');
var express = require('express');
var app = express();
var wait = require('wait.for');
var MongoClient = require('mongodb').MongoClient;

// in  a Fiber
// function handleGet(req, res){
// 	// MongoClient.connect('mongodb://localhost:27017/test'
//   var result = wait.for(MongoClient.connect,'mongodb://localhost:27017/') ;
//   console.dir('------------------handle get----------------------------');
//   console.dir(result);
// }

// app.get('/', function(req,res){
//       wait.launchFiber(handleGet, req, res); //handle in a fiber, keep node spinning
// });

// app.listen(3000);

function  testFunction(){
    console.log('fiber start');
    var db = wait.for(MongoClient.connect,'mongodb://localhost:27017/local') ;
    // console.log('function returned:', db);

    // var adminDb = db.admin()
    console.dir('--------------------------------------------------------------------------------');
    // console.dir(db.databaseName);
    var collection = db.collection('mycol');
    var documents = {title:"ABCDEF for me"};
    var write = wait.for(collection.insertOne,documents) ;
   	     	
     // console.dir(collection);
     // db.stats(function(err, stats) {
     // 	console.dir(stats);
     // });
	// var abc = db.listCollections();
	// console.dir(abc);
    console.dir('--------------------------------------------------------------------------------');

    console.log('fiber end');
};

console.log('app start');
wait.launchFiber(testFunction);
console.log('after launch');

// MongoClient.connect('mongodb://localhost:27017/local', function(err, db) {
//   // test.equal(null, err);
//   console.dir(db);
//   // Add a user to the database
  
// });