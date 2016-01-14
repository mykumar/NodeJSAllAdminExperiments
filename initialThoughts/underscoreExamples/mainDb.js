var DB = function() {
	this.connections = [];
	this.connectionName = null;
	this.databaseName = null;
	this.tableName = null;
}
DB.prototype.isObject = function(val) {
    return val instanceof Object; 
};
DB.prototype.compareStrings = function(string1, string2, ignoreCase, useLocale) {
	if(ignoreCase == undefined) { ignoreCase = true; }
	if(useLocale == undefined) { useLocale = true; } 
    if (ignoreCase) {
        if (useLocale) {
            string1 = string1.toLocaleLowerCase();
            string2 = string2.toLocaleLowerCase();
        }
        else {
            string1 = string1.toLowerCase();
            string2 = string2.toLowerCase();
        }
    }
    return string1 === string2;
}

DB.prototype.getConnectionIndex = function(connectionName) {
	if(connectionName == undefined) { 
		connectionName = this.connectionName;
	}
	var indexMain = -1; 
	var that = this;
	this.connections.forEach(function(value,index) {
		if(that.compareStrings(value.name, connectionName)) {
			indexMain = index;
		}
	});
	return indexMain;
};
DB.prototype.getDatabaseIndex = function(databaseName) {
	var connectionIndex = this.getConnectionIndex();
	if(databaseName == undefined) { 
		databaseName = this.databaseName;
	}
	var indexMain = -1; 
	var that = this;
	this.connections[connectionIndex].databases.forEach(function(value,index) {
		if(that.compareStrings(value.name, databaseName)) {
			indexMain = index;
		}
	});
	return indexMain;
};
DB.prototype.getTableIndex = function(tableName) {
	var connectionIndex = this.getConnectionIndex();
	var databaseIndex = this.getDatabaseIndex();
	if(tableName == undefined) { 
		tableName = this.tableName;
	}
	var indexMain = -1; 
	var that = this;
	this.connections[connectionIndex].databases[databaseIndex].tables.forEach(function(value,index) {
		if(that.compareStrings(value.name, tableName)) {
			indexMain = index;
		}
	});
	return indexMain;
};
DB.prototype.setConnection = function(connectionName) {
	this.connectionName = connectionName;
	return this;
}
DB.prototype.setDatabase = function(databaseName) {
	this.databaseName = databaseName;
	return this;
}
DB.prototype.setTable = function(tableName) {
	this.tableName = tableName;
	return this;
}
DB.prototype.createConnection = function(object, callback) {
	var newConnectionParams = {};
	for (prop in object) {
			newConnectionParams[prop] = object[prop];
	}
	newConnectionParams.databases = []; 
	this.connections.push(newConnectionParams);
	this.setConnection(newConnectionParams.name);
	callback(null,'Connection Created Successfully');
	return this;
}
DB.prototype.createDatabase = function(object, callback) {
	var connectionIndex = this.getConnectionIndex();
	var newDatabaseParams = {};
	for (prop in object) {
			newDatabaseParams[prop] = object[prop];
	}
	newDatabaseParams.tables = []; 
	newDatabaseParams.views = [];
	newDatabaseParams.storedProcedures = []; 
	newDatabaseParams.functions = [];  
	this.connections[connectionIndex].databases.push(newDatabaseParams);
	this.setDatabase(newDatabaseParams.name);
	callback(null,'Database Created successfully');
	return this;
}
DB.prototype.createTable = function(object, callback) {
	var connectionIndex = this.getConnectionIndex();
	var databaseIndex = this.getDatabaseIndex();
	var newTableParams = {};
	var isColumns = false;
	for (prop in object) {
			if(prop == 'columns') {
				isColumns = true;
			} 
			newTableParams[prop] = object[prop];
	}
	if(!isColumns) { newTableParams.columns = []; }
	newTableParams.indexes = [];
	newTableParams.foreignKeys = []; 
	newTableParams.triggers = [];  
	this.connections[connectionIndex].databases[databaseIndex].tables.push(newTableParams);
	this.setTable(newTableParams.name);
	callback(null,'Table Created successfully');
	return this;
}
DB.prototype.createColumns = function(object, callback) {
	var connectionIndex = this.getConnectionIndex();
	var databaseIndex = this.getDatabaseIndex();
	var tableIndex = this.getTableIndex();
	var newColumnParams = {};
	var isColumns = false;
	for (var i = 0; i < object.length; i++) {	
		this.connections[connectionIndex].databases[databaseIndex].tables[tableIndex].columns.push(object[i]);	
	}
	callback(null,'Columns Created successfully');
	return this;
}
DB.prototype.createColumn = function(object, callback) {
	var columns = [];
	columns.push(object);
	this.createColumns(columns, callback);	
	return this;
}
DB.prototype.isTypeExists = function(object) {
	switch (object['type']) {
    	case 'connections':
    	case 'connection':
			return this.getConnectionIndex(object['name']) == -1 ? false : true;
		case 'databases':
		case 'database':
			return this.getDatabaseIndex(object['name']) == -1 ? false : true;
		case 'tables':
		case 'table':			
			return this.getTableIndex(object['name']) == -1 ? false : true;    		
	}
	return false;
}

module.exports = DB;

	


