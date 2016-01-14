var main = require('./mongoDbDs');
var jsonDb = new main();

var connectionParams = {};
connectionParams.name =  'Connection'; 
connectionParams.ip =  '127.0.0.1';
connectionParams.port =  '27071';
var databaseParams = {};
databaseParams.name =  'local'; 
var collectionParams = {};
collectionParams.name =  'myCol'; 

jsonDb.createConnection(connectionParams,callback)
	  .createDatabase(databaseParams, callback)
	  .createCollection(collectionParams, callback);

var collectionParams = {};
collectionParams.name =  'Temp'; 
jsonDb.createCollection(collectionParams, callback);
	  
var databaseParams = {};
databaseParams.name =  'xyz'; 
jsonDb.createDatabase(databaseParams, callback);


var collectionParams = {};
collectionParams.name =  'xyCollection'; 
jsonDb.setDatabase('xyz').createCollection(collectionParams, callback);


var collectionParams = {};
collectionParams.name =  'localCollection'; 
jsonDb.setDatabase('local').createCollection(collectionParams, callback);
// console.dir('--------------isTypeExists------------------------');
// console.dir(jsonDb.isTypeExists({type: 'connections' , name: 'connection'}));
// console.dir('--------------LAST-------------------------');
var str = JSON.stringify(jsonDb);
var obj = JSON.parse(str); 
console.dir(str);
// console.dir(obj);

function callback(err, results){
	// console.dir(err);
	// console.dir(results);
}

