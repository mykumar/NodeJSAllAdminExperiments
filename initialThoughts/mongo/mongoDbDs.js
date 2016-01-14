var DB = function() {
	this.connections = [];
	this.connectionName = null;
	this.databaseName = null;
	this.collectionName = null;
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
DB.prototype.getCollectionIndex = function(collectionName) {
	var connectionIndex = this.getConnectionIndex();
	var databaseIndex = this.getDatabaseIndex();
	if(collectionName == undefined) { 
		collectionName = this.collectionName;
	}
	var indexMain = -1; 
	var that = this;
	this.connections[connectionIndex].databases[databaseIndex].collections.forEach(function(value,index) {
		if(that.compareStrings(value.name, collectionName)) {
			indexMain = index;
		}
	});
	return indexMain;
};

DB.prototype.getDatabaseNames = function(collectionName) {
	var connectionIndex = this.getConnectionIndex();
	var databases = [];
	this.connections[connectionIndex].databases.forEach(function(value,index) {
		databases.push(value.name);
	});	
	return databases;
}
DB.prototype.getcollectionNames = function(collectionName) {
	var connectionIndex = this.getConnectionIndex();
	var databaseIndex = this.getDatabaseIndex();
	var collections = [];
	this.connections[connectionIndex].databases[databaseIndex].collections.forEach(function(value,index) {
		collections.push(value.name);
	});	
	
	return collections;
}
DB.prototype.setConnection = function(connectionName) {
	this.connectionName = connectionName;
	return this;
}
DB.prototype.setDatabase = function(databaseName) {
	this.databaseName = databaseName;
	return this;
}
DB.prototype.setCollection = function(collectionName) {
	this.collectionName = collectionName;
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
	newDatabaseParams.collections = []; 
	newDatabaseParams.functions = [];  
	this.connections[connectionIndex].databases.push(newDatabaseParams);
	this.setDatabase(newDatabaseParams.name);
	callback(null,'Database Created successfully');
	return this;
}
DB.prototype.createCollection = function(object, callback) {
	var connectionIndex = this.getConnectionIndex();
	var databaseIndex = this.getDatabaseIndex();
	var newCollectionParams = {};
	var isFields = false;
	for (prop in object) {
			if(prop == 'fields') {
				isFields = true;
			} 
			newCollectionParams[prop] = object[prop];
	}
	if(!isFields) { newCollectionParams.fields = []; }
	newCollectionParams.indexes = [];
	this.connections[connectionIndex].databases[databaseIndex].collections.push(newCollectionParams);
	this.setCollection(newCollectionParams.name);
	callback(null,'Collection Created successfully');
	return this;
}
DB.prototype.createFields = function(object, callback) {
	var connectionIndex = this.getConnectionIndex();
	var databaseIndex = this.getDatabaseIndex();
	var collectionIndex = this.getCollectionIndex();
	var newFieldsParams = {};
	for (var i = 0; i < object.length; i++) {	
		this.connections[connectionIndex].databases[databaseIndex].collections[collectionIndex].fields.push(object[i]);	
	}
	callback(null,'Fields Created successfully');
	return this;
}
DB.prototype.createColumn = function(object, callback) {
	var fields = [];
	fields.push(object);
	this.createFields(fields, callback);	
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
		case 'collections':
		case 'collection':			
			return this.getCollectionIndex(object['name']) == -1 ? false : true;    		
	}
	return false;
}

module.exports = DB;

	


