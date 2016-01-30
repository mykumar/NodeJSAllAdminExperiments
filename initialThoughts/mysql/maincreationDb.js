var main = require('./mainMysql');
var jsonDb = new main();

var connectionParams = {};
connectionParams.name =  'Connection'; 
connectionParams.id = "SCH_C_myConnection",
connectionParams.ip =  '127.0.0.1';

jsonDb.createConnection(connectionParams);

var connectionParams = {};
connectionParams.name =  'Connection2222'; 
connectionParams.id = "SCH_C_myConnection222",
connectionParams.ip =  '127.0.0.12222';

jsonDb.createConnection(connectionParams);

jsonDb.setConnection('Connection');

var databaseParams = {};
databaseParams.name =  'informationDB'; 
databaseParams.id = "SCH_C_myConnection_DB_informationDB";

jsonDb.createDatabase(databaseParams);

var tableParams = {};
tableParams.name =  'table1'; 
tableParams.id = "SCH_C_myConnection_DB_informationDB_T_tabe1";

jsonDb.createTable(tableParams);

var tableParams = {};
tableParams.name =  'table2'; 
tableParams.id = "SCH_C_myConnection_DB_informationDB_T_tabe2";

jsonDb.createTable(tableParams);

var databaseParams = {};
databaseParams.name =  'exampleDB'; 
databaseParams.id = "SCH_C_myConnection_DB_exampleDB";

jsonDb.createDatabase(databaseParams);

jsonDb.setConnection('Connection2222');

var databaseParams = {};
databaseParams.name =  'informationDB'; 
databaseParams.id = "SCH_C_myConnection_DB_informationDB";

jsonDb.createDatabase(databaseParams);


jsonDb.setDatabase('informationDB');

var tableParams = {};
tableParams.name =  'exampleTable1'; 
tableParams.id = "SCH_C_myConnection_DB_informationDB_T_exampleTable1";

jsonDb.createTable(tableParams);


console.dir(jsonDb.json());

// var databaseParams = {};
// databaseParams.name =  'timetrack'; 
// var tableParams = {};
// tableParams.name =  'work'; 
// var columnsParams =  [
// 							{name: 'id'},
// 							{name: 'hours'},
// 							{name: 'date'},
// 							{name: 'archived'},
// 							{name: 'descripation'},
// 					]; 

// jsonDb.createConnection(connectionParams,callback)
// 	  .createDatabase(databaseParams, callback)
// 	  .createTable(tableParams, callback)
// 	  .createColumns(columnsParams, callback)
// 	  .createColumn({name: 'sex'},callback)
// 	  .createColumn({name: 'salary'},callback)
// 	  .createColumn({name: 'hourlyRate'},callback);

// var tableParams = {};
// tableParams.name =  'Temp'; 
// jsonDb.createTable(tableParams, callback)
// 	  .createColumns(columnsParams, callback);
// // console.dir('--------------isTypeExists------------------------');
// // console.dir(jsonDb.isTypeExists({type: 'connections' , name: 'connection'}));
// // console.dir('--------------LAST-------------------------');
// var str = JSON.stringify(jsonDb);
// var obj = JSON.parse(str); 
// console.dir(str);
// console.dir(obj);

function callback(err, results){
	// console.dir(err);
	// console.dir(results);
}

