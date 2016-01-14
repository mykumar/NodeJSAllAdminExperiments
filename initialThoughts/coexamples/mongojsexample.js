// var mongojs = require('mongojs');

// var db = mongojs('mongodb://localhost:27017/local');
// var mycollection = db.collection('mycol');

// db.runCommand({ping: 1}, function (err, res) {
//     if(!err && res.ok) console.log('we\'re up')
// })

// var child = require('child_process').execFile('mongo', [ 
//     "local", "db.getCollection('mycol').find({by:'bob'})" ]); 
// // use event hooks to provide a callback to execute when data are available: 
// child.stdout.on('data', function(data) {
//     console.log(data.toString()); 
// });

// var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect('mongodb://localhost:27017/mycol', function(err, db) {
//   // Execute ping against the server

//   db.command("find({by:'bob'})",function(err, result) {
//     console.dir('-------------command output ERROROROORORO----------------');
//     console.dir(err);
//     console.dir('-------------command output----------------');
//   	console.dir(result);
//   	console.dir('-------------command output----------------');
//     db.close();
//   });
// });

// console.dir('-------I AM THE END------------------------------------');

    var c = require('child_process');
    var spawn = c.spawn;
    var child = spawn("mongo", [
    							"local",
    							"--eval",
    							"load('shellfind.js')"		
    						]);
    var resp = "";

    child.stdout.on('data', function (buffer) { 
    	// console.dir(buffer);
    	resp += buffer.toString();
    	// console.dir('stdout daa-----------------------') ;
    	// console.dir(resp);

    });
    child.stdout.on('end', function() { 
    	// data = JSON.parse(resp);
		console.dir(resp);
		console.dir(typeof resp);
    });
