var DB = function() {
	this.connections = [];
	this.connectionName = null;
	this.databaseName = null;
	this.tableName = null;
	this.isTaskInProgress = false;
	this.separator = "$%$$^";
}
DB.prototype.isObject = function(val) {
    return val instanceof Object; 
};
DB.prototype.startTask = function() {
    this.isTaskInProgress = true;
    return this; 
};
DB.prototype.endTask = function() {
    this.isTaskInProgress = false;
    return this; 
};
DB.prototype.isTaskCompleted = function() {
    return !this.isTaskInProgress;
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
DB.prototype.getConnections = function() {
	var jsonData = [];
	for (var connectionIndex=0; connectionIndex < this.connections.length; connectionIndex++){
		var connectionObj = {};
		for (var property in this.connections[connectionIndex]) {
			if(this.compareStrings(property, 'children')) {
				connectionObj[property] = [];	
			} else {
				connectionObj[property] = this.connections[connectionIndex][property];
			}	
		}
		jsonData.push(connectionObj);
	}	
	return jsonData;
};	
DB.prototype.getConnectionChildren = function(connectionName) {
	var connectionIndex = this.getConnectionIndex(connectionName);
	return this.connections[connectionIndex].children;
};
DB.prototype.getDatabaseIndex = function(databaseName) {
	var connectionIndex = this.getConnectionIndex();
	if(databaseName == undefined) { 
		databaseName = this.databaseName;
	}
	var indexMain = -1; 
	var that = this;
	this.connections[connectionIndex].children.forEach(function(value,index) {
		if(that.compareStrings(value.name, databaseName)) {
			indexMain = index;
		}
	});
	return indexMain;
};
DB.prototype.getIndexInChildren = function(type, connectionIndex, databaseIndex) {
	var indexMain = -1; 
	var that = this;
	if(type === "Tables") {
		this.connections[connectionIndex].children[databaseIndex].children.forEach(function(value,index) {
			if(that.compareStrings(value.name, type)) {
				indexMain = index;
			}
		});
	}	
	return indexMain;
}
DB.prototype.getTableIndex = function(tableName) {
	var connectionIndex = this.getConnectionIndex();
	var databaseIndex = this.getDatabaseIndex();
	if(tableName == undefined) { 
		tableName = this.tableName;
	}
	var indexMain = -1; 
	var that = this;
	var tablesIndex = this.getIndexInChildren("Tables", connectionIndex, databaseIndex); 
	this.connections[connectionIndex].children[databaseIndex].children[tablesIndex].children.forEach(function(value,index) {
		if(that.compareStrings(value.name, tableName)) {
			indexMain = index;
		}
	});
	return indexMain;
};

DB.prototype.getDatabaseNames = function() {
	var connectionIndex = this.getConnectionIndex();
	var databases = [];
	this.connections[connectionIndex].children.forEach(function(value,index) {
		databases.push(value.name);
	});	
	return databases;
}
DB.prototype.getTableNames = function(tableName) {
	var connectionIndex = this.getConnectionIndex();
	var databaseIndex = this.getDatabaseIndex();
	var tables = [];
	this.connections[connectionIndex].children[databaseIndex].children.forEach(function(value,index) {
		tables.push(value.name);
	});	
	
	return tables;
}
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
DB.prototype.createConnection = function(object) {
	var connectionIndex = this.getConnectionIndex(object.name);
	if(connectionIndex == -1) {
		var newConnectionParams = {};
		for (prop in object) {
				newConnectionParams[prop] = object[prop];
		}
		newConnectionParams.children = []; 
		this.connections.push(newConnectionParams);
		this.setConnection(newConnectionParams.name);
	}	
	return this;
}
DB.prototype.createDatabase = function(object) {
	var connectionIndex = this.getConnectionIndex();
	var databaseIndex = this.getDatabaseIndex(object.name);
	if(databaseIndex == -1) {
		var newDatabaseParams = {};
		for (prop in object) {
				newDatabaseParams[prop] = object[prop];
		}
		newDatabaseParams.children = []; 
		var tableParams = {};
		tableParams.name =  "Tables"; 
		tableParams.id = "SCH" + this.separator  + "C" + this.separator + this.connectionName +  this.separator + "DB" + this.separator + object.name + this.separator + "TH";
		tableParams.children = []; 
		newDatabaseParams.children.push(tableParams);
		// newDatabaseParams.views = [];
		// newDatabaseParams.storedProcedures = []; 
		// newDatabaseParams.functions = [];  
		this.connections[connectionIndex].children.push(newDatabaseParams);
		this.setDatabase(newDatabaseParams.name);
	}	
	return this;
}
DB.prototype.createTable = function(object) {
	// console.dir('------createTable------------------');
	// console.dir(object);
	// console.dir('------createTable------------------');
	
	var connectionIndex = this.getConnectionIndex();
	var databaseIndex = this.getDatabaseIndex();
	var tableIndex = this.getTableIndex(object.name);
	if(tableIndex == -1) {
		var newTableParams = {};
		var isColumns = false;
		for (prop in object) {
				// if(prop == 'columns') {
				// 	isColumns = true;
				// } 
			newTableParams[prop] = object[prop];
		}
		// if(isColumns) { newTableParams.columns = []; }
		// newTableParams.indexes = [];
		// newTableParams.foreignKeys = []; 
		// newTableParams.triggers = []; 
		var tablesIndex = this.getIndexInChildren("Tables", connectionIndex, databaseIndex);  
		this.connections[connectionIndex].children[databaseIndex].children[tablesIndex].children.push(newTableParams);
		this.setTable(newTableParams.name);
	}
	return this;
}
DB.prototype.createColumns = function(object) {
	// var connectionIndex = this.getConnectionIndex();
	// var databaseIndex = this.getDatabaseIndex();
	// var tableIndex = this.getTableIndex();
	// var newColumnParams = {};
	// var isColumns = false;
	// for (var i = 0; i < object.length; i++) {	
	// 	this.connections[connectionIndex].children[databaseIndex].tables[tableIndex].columns.push(object[i]);	
	// }
	// return this;
}
DB.prototype.createColumn = function(object) {
	// var columns = [];
	// columns.push(object);
	// this.createColumns(columns);	
	// return this;
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
DB.prototype.json = function() {
	return JSON.stringify(this.connections);
}	

module.exports = DB;

	

