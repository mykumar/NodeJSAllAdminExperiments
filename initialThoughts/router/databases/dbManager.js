'use strict';
var dbManager = (function () {
    var dbInstances =  {};
	var dataBaseTypes = 
			[
				'mysql',
				'mongo'
			 ];
	var isDatabaseTypeExists = function(dataBaseType) {
		return (dataBaseTypes.indexOf(dataBaseType) == -1) ? false : true;
	};
	var checkInstanceExists = function(dataBaseType) {
		return (dataBaseType in dbInstances);
	};
	var getPathForDatabaseTypeLib = function(dataBaseType) {
		return './' + dataBaseType + "/" + dataBaseType + "Manager";
	};	
	var createInstance = function(dataBaseType) {
		var instanceClass = require(getPathForDatabaseTypeLib(dataBaseType));
		dbInstances[dataBaseType] = new instanceClass();
		return dbInstances[dataBaseType];
	};
	var dropInstance = function(dataBaseType) {
		delete dbInstances[dataBaseType];
	};					 
    return {
        getInstance: function(dataBaseType) {
        	console.dir('I am in he getInstance');
			if(isDatabaseTypeExists(dataBaseType)) {	
				if(checkInstanceExists(dataBaseType)) {
						return dbInstances[dataBaseType];
				} else {
						var dbInstance = createInstance(dataBaseType);
						dbInstance.init();
						return dbInstance;	
				}					
			}	
		},
    };
})();

module.exports = dbManager;