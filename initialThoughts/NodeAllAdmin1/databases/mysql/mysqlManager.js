var async = require('async');
var mysql = require('mysql');
var mysqlUtilities = require('mysql-utilities');
var async = require('async');
var mysqlManager = function() {
	var dsClass = require('./lib/datastructure');
	this.wait = require('wait.for');
	this.ds = new dsClass();   
	this.connection = null;
	this.systemDatabasesList = [
				'information_schema',
  				'mysql',
  				'performance_schema'
  			];
  	this.isSystemDatabasesIgnored = true;		
}
mysqlManager.prototype.getConnectionParameters= function(connectionName) {
	//Get the connection parametrs using this name 'connectionName'
	return {
				host:     'localhost',
			    user:     'root',
			    password: 'orbit786',
			};
			// password: 'newpwd',
}
mysqlManager.prototype.createConnectionString= function(dataBaseName,connectionName) {
	console.dir('This is createConnectionString');
	var connectionParams = this.getConnectionParameters(connectionName);
	//As of now, you are doing temporyliy in the init() function
	// this.ds.createConnection(connectionParams);
	var str = JSON.stringify(this.ds);
	console.dir(str);		  	
	return connectionParams;
}
mysqlManager.prototype.connectToDatabase= function(req, res,callback) {
	console.dir('This is connectToDatabase');
	var connString = this.createConnectionString(req.databaseName,req.connectionName);	
	this.connection = mysql.createConnection(connString);
	// Mix-in for Data Access Methods and SQL Autogenerating Methods
	mysqlUtilities.upgrade(this.connection);
	// Mix-in for Introspection Methods
	mysqlUtilities.introspection(this.connection);
	// console.dir(this.connection);
	this.connection.connect();
	// console.dir(this.connection);

	if(callback) { callback(); }
}
mysqlManager.prototype.init = function(val) {
    var connectionParams = {};
	connectionParams.name =  'connection'; 
	connectionParams.host =  'localhost';
	connectionParams.id = "SCH_C_" + connectionParams.name;

	connectionParams.user =   'root';
	connectionParams.password =   'newpwd';
	// // connectionParams.database =   'timetrack';
	// this.connection.connect();
	this.ds.createConnection(connectionParams);
	this.isSystemDatabasesIgnored = true;
	return this;
}
mysqlManager.prototype.waitforLaunchFiber = function(req, res, func){
	var that = this;
	this.wait.launchFiber(this[func], req, res, that); //handle in a fiber, keep node spinning
}
mysqlManager.prototype.selectQuery = function(req, res, that){
	var results = this.wait.forMethod(that.connection, 'query', details.query);
 	res.send(JSON.stringify(results));   
}
mysqlManager.prototype.query = function(req, res, that){
	var results = this.wait.forMethod(that.connection, 'query', details.query);
 	res.send(JSON.stringify(results));   
}
mysqlManager.prototype.loadConnections = function(req, res){
	var jsonData = this.ds.getConnections();
	// res.json(that.ds.getConnectionChildren(req.connectionName));
	res.json(jsonData);   
};
mysqlManager.prototype.loadConnectionsChildren = function(req, res){
	req.databaseManager.connectToDatabase(req, res);
	var that = this;
	var callmes = [
		    function getDatases(callback) {
		        that.connection.databases(function(err, databases) {
    				// console.dir({databases:databases});
    				console.dir('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    				console.dir(databases);
    				that.ds.setConnection(req.connectionName);
    				for(database=0;database < databases.length; database++) {
    						// console.dir(databases[database]);
    						var databaseParams = {};
				            databaseParams.name =  databases[database]; 

				            databaseParams.id =  "SCH_C_" + req.connectionName + "_DB_" + databases[database]; 
				            that.ds.createDatabase(databaseParams);
    				}	
    				callback(null);
    			});	
		    },
		    function getTables(callback) {
				var databaseNames = that.ds.getDatabaseNames();
				async.mapSeries(databaseNames, function(dataBaseName,mapseriesCallback){
						console.dir('$$$$$$$$$$DATABASE NAME$$$$$$$$$$$$$$$$');
						console.dir(dataBaseName);
						that.ds.setConnection(req.connectionName);	
						if(!that.isSystemDatabase(dataBaseName)) {
							that.connection.databaseTables(dataBaseName, function(err, tables) {
				            		for (var table in tables) {
				            			console.dir('-------------TABLE NAME-----------');
	            		                var tableParams = {};
						                tableParams.name =  table;
						                tableParams.id =  "SCH_C_" + req.connectionName + "_DB_" + that.ds.databaseName + "_T_" + table; 
						                // that.ds.setDatabase(databaseNames[database]);
						                console.dir(tableParams);
						                that.ds.createTable(tableParams);
				            		}
				            		mapseriesCallback(null, "abc");			
				            });
				        } else {
				        	mapseriesCallback(null, "abc");	
				        }    
					}, function(error, result){
						console.dir('$$$$$$$$$$DATABASE NAME RESULT$$$$$$$$$$$$$$$$');
						console.dir(result);
						callback(null, 'results');
					});
		    }
	];

	async.waterfall(callmes, function(err, results) {
	    // results is now equals to: {one: 'abc\n', two: 'xyz\n'}
	    console.dir(results);
		console.dir('--------------------------------------------------------------------');
		console.dir(that.ds.json());
		console.dir('--------------------------------------------------------------------');
		// var jsonData = that.ds.connections;
		res.json(that.ds.getConnectionChildren(req.connectionName));
		// res.json(jsonData);   
	});
}
mysqlManager.prototype.fillDatabasesDetails = function() {
	var databaseNames = this.wait.forMethod(this.connection, 'databases');
	for(database=0;database < databaseNames.length; database++) {
            var databaseParams = {};
            databaseParams.name =  databaseNames[database]; 
            databaseParams.id =  "SCH_C_connection_DB_" + databaseNames[database]; 
            this.ds.createDatabase(databaseParams);
    }
    return this;	
}
mysqlManager.prototype.isSystemDatabase = function(databaseName) {
	if(this.isSystemDatabasesIgnored){
		return this.systemDatabasesList.indexOf(databaseName) > -1 ? true : false;
	}
	return false;
}	
mysqlManager.prototype.fillTablesDetails = function() {
	var databaseNames = this.ds.getDatabaseNames();
    for(database=0;database < databaseNames.length; database++) {
        if(!this.isSystemDatabase(databaseNames[database])) {
        	var tables = this.wait.forMethod(this.connection, 'databaseTables', databaseNames[database]);
        	for (var table in tables) {
                var tableParams = {};
                tableParams.name =  table;
                tableParams.id =  "SCH_C_connection_DB_" + databaseNames[database] + "_T_" + table; 
                this.ds.setDatabase(databaseNames[database]);
                this.ds.createTable(tableParams);
            }    
        }
    }
    return this;		
}
mysqlManager.prototype.fillColumnDetails = function(){
	var databaseNames = this.ds.getDatabaseNames();
    for(database=0;database < databaseNames.length; database++) {					        
        if(!this.isSystemDatabase(databaseNames[database])) {
        	var tables = this.ds.setDatabase(databaseNames[database]).getTableNames();
        	for(table=0;table < tables.length; table++) {
        		this.ds.setDatabase(databaseNames[database]);
                this.ds.setTable(tables[table]);					        
		        var query = 'show columns from ' + databaseNames[database] + '.' + tables[table] + ';';
		        var columns = this.wait.forMethod(this.connection, 'query', query);
				for(column=0;column < columns.length; column++) {
					var columnObject = { name: columns[column].Field };
					this.ds.createColumn(columnObject);
				}
		   	}
        }
    }        
    return this;
}


// mysqlManager.prototype.fillMetaDetails = function(that, waitCallback){
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

module.exports = mysqlManager;