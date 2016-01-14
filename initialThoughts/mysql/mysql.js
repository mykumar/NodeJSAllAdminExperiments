var mysql = require('mysql');
var mysqlUtilities = require('mysql-utilities');
var async = require('async');
var main = require('./mainDb');    
var wait = require('wait.for');

var mysqlDetails = function() {
	this.jsonDb = new main();   
	this.connection = mysql.createConnection({
	    host:     'localhost',
	    user:     'root',
	    password: 'newpwd',
	    // database: 'timetrack'
	});
	this.systemDatabasesList = [
				'information_schema',
  				'mysql',
  				'performance_schema'
  			];
  	this.isSystemDatabasesIgnored = false;		
}
mysqlDetails.prototype.init = function(val) {
    var connectionParams = {};
	connectionParams.name =  'Connection'; 
	connectionParams.host =  'localhost';
	connectionParams.user =   'root';
	connectionParams.password =   'newpwd';
	// connectionParams.database =   'timetrack';
	this.connection.connect();
	this.jsonDb.createConnection(connectionParams,jsoncallback);
	this.isSystemDatabasesIgnored = true;
	// Mix-in for Data Access Methods and SQL Autogenerating Methods
	mysqlUtilities.upgrade(this.connection);
	// Mix-in for Introspection Methods
	mysqlUtilities.introspection(this.connection);
	return this;
}
mysqlDetails.prototype.waitforLaunchFiber = function(req, res, func,details){
	var that = this;
	wait.launchFiber(this[func], req, res, that, details); //handle in a fiber, keep node spinning
}
mysqlDetails.prototype.selectQuery = function(req, res, that, details){
	var results = wait.forMethod(that.connection, 'query', details.query);
 	res.send(JSON.stringify(results));   
}
mysqlDetails.prototype.query = function(req, res, that, details){
	var results = wait.forMethod(that.connection, 'query', details.query);
 	res.send(JSON.stringify(results));   
}
mysqlDetails.prototype.fillMetaDetails = function(req, res, that, details){

	that.fillDatabasesDetails()
		.fillTablesDetails()
		.fillColumnDetails();	

 	res.send(JSON.stringify(that.jsonDb));   
}
mysqlDetails.prototype.fillDatabasesDetails = function(){
	var databaseNames = wait.forMethod(this.connection, 'databases');
	for(database=0;database < databaseNames.length; database++) {
            var databaseParams = {};
            databaseParams.name =  databaseNames[database]; 
            this.jsonDb.createDatabase(databaseParams, jsoncallback);
    }
    return this;	
}
mysqlDetails.prototype.isSystemDatabase = function(databaseName){
	if(this.isSystemDatabasesIgnored){
		return this.systemDatabasesList.indexOf(databaseName) > -1 ? true : false;
	}
	return false;
}	
mysqlDetails.prototype.fillTablesDetails = function(){
	var databaseNames = this.jsonDb.getDatabaseNames();
    for(database=0;database < databaseNames.length; database++) {
        if(!this.isSystemDatabase(databaseNames[database])) {
        	var tables = wait.forMethod(this.connection, 'databaseTables', databaseNames[database]);
        	for (var table in tables) {
                var tableParams = {};
                tableParams.name =  table;
                this.jsonDb.setDatabase(databaseNames[database]);
                this.jsonDb.createTable(tableParams, jsoncallback);
            }    
        }
    }
    return this;		
}
mysqlDetails.prototype.fillColumnDetails = function(){
	var databaseNames = this.jsonDb.getDatabaseNames();
    for(database=0;database < databaseNames.length; database++) {					        
        if(!this.isSystemDatabase(databaseNames[database])) {
        	var tables = this.jsonDb.setDatabase(databaseNames[database]).getTableNames();
        	for(table=0;table < tables.length; table++) {
        		this.jsonDb.setDatabase(databaseNames[database]);
                this.jsonDb.setTable(tables[table]);					        
		        var query = 'show columns from ' + databaseNames[database] + '.' + tables[table] + ';';
		        var columns = wait.forMethod(this.connection, 'query', query);
				for(column=0;column < columns.length; column++) {
					var columnObject = { name: columns[column].Field };
					this.jsonDb.createColumn(columnObject, jsoncallback);
				}
		   	}
        }
    }        
    return this;
}


// mysqlDetails.prototype.fillMetaDetails = function(that, waitCallback){
//             async.series
//             (
//                 [  
//                     //Get DATABASES
//                     function(callback)
//                     {
//                     	if(that.connection == undefined) {
//                     		console.dir('Baby i am undefined THAT THAT THAT');

//                     	}
//                         that.connection.databases(function(err, databases) {
//                             databases.forEach(function(database) {
//                                 var databaseParams = {};
//                                 databaseParams.name =  database; 
//                                 that.jsonDb.createDatabase(databaseParams, jsoncallback);
//                             });
//                             callback();
//                         });
//                     }
//                     ,
//                     //Get Tables for EACH DATABASE
//                     function(callback)
//                     {
//                         var databaseNames = that.jsonDb.getDatabaseNames();
//                         databaseNames.forEach(function(database) {
//                             if(database == 'timetrack') {
//                                 that.connection.databaseTables(database, function(err, tables) {
//                                     for (var table in tables) {
//                                         var tableParams = {};
//                                         tableParams.name =  table;
//                                         that.jsonDb.createTable(tableParams, jsoncallback);
//                                     }    
//                                     callback();
//                                 });
//                             }    
//                         });
//                     }
//                     ,
//                     //Get Columns for EACH Table
//                     function(callback)
//                     {
//                         var databaseNames = that.jsonDb.getDatabaseNames();
//                         var asyncCalled = [];
//                         var database =0;
//                         for(database=0;database < databaseNames.length; database++) {					        
// 					        if(databaseNames[database] == 'timetrack') {
//                             	var tables = that.jsonDb.setDatabase(databaseNames[database]).getTableNames();
//                             	for(table=0;table < tables.length; tables++) {					        
// 							        console.log(tables[table]);
// 							        var query = 'show columns from ' + databaseNames[database] + '.' + tables[table] + ';';
// 							        console.dir(query);
// 							        asyncCalled.push(query);
// 								   	that.connection.query(query, function(err, columns, fields) {
// 								   		asyncCalled.pop();		
// 								   		console.dir('--------rows--------------');		
// 										console.dir(columns);
// 										for(column=0;table < columns.length; columns++) {
// 													console.log(columns[column].Field);
// 										}
// 										// if(!completedProcessing) {					        
// 										//   	completedProcessing = true;
// 									 	//   		callback();
// 									 	//   	}	
// 									});
// 							   	}
//                             }
// 					    }

//          //                databaseNames.forEach(function(database) {
//          //                    if(database == 'timetrack') {
//          //                    	var tables = that.jsonDb.setDatabase(database).getTableNames();
//          //                        tables.forEach(function(table) {
// 							  //       console.log(table);
// 							  //       var query = 'show columns from ' + database + '.' + table + ';';
// 							  //       console.dir(query);
// 								 //   	that.connection.query(query, function(err, rows, fields) {
// 								 //   	  console.dir('--------rows--------------');		
// 								 //   	  console.dir(rows);
// 									//   // rows.forEach(function(columnsEntry) {
// 									//   //       console.log(columnsEntry);
// 									//   //  });
// 									// });
// 							  //  	});
//          //                    }
//          //                });
//                         if(database == databaseNames.length && !(asyncCalled.length > 0)) {
//                         	console.dir('-------------I AM CALLING CALLBACK----------------------');
//                         	callback();
//                         }	
//                     }

//                 ], 
//                 function (err, results) {
//                     var str = JSON.stringify(that.jsonDb);
//                     console.dir(str);
//                     waitCallback(null, str);
//                     // Release connection
//                     that.connection.end();
//                 }
//             ); 
// };
function jsoncallback(err, results){
    // console.dir(err);
    // console.dir(results);
}
module.exports = mysqlDetails;