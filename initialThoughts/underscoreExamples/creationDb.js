var main = require('./mainDb');
var jsonDb = new main();

var connectionParams = {};
connectionParams.name =  'Connection'; 
connectionParams.ip =  '127.0.0.1';
var databaseParams = {};
databaseParams.name =  'timetrack'; 
var tableParams = {};
tableParams.name =  'work'; 
var columnsParams =  [
							{name: 'id'},
							{name: 'hours'},
							{name: 'date'},
							{name: 'archived'},
							{name: 'descripation'},
					]; 

jsonDb.createConnection(connectionParams,callback)
	  .createDatabase(databaseParams, callback)
	  .createTable(tableParams, callback)
	  .createColumns(columnsParams, callback)
	  .createColumn({name: 'sex'},callback)
	  .createColumn({name: 'salary'},callback)
	  .createColumn({name: 'hourlyRate'},callback);

var tableParams = {};
tableParams.name =  'Temp'; 
jsonDb.createTable(tableParams, callback)
	  .createColumns(columnsParams, callback);
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

