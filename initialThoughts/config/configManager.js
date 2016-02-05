
var ConfigMngr = function() {
	this.CONFIG_FILE = './exfile.config';
	this.config = [];
	this.uuidGen = require('shortid');
	this.fs = require('fs');
}

ConfigMngr.prototype.init = function(configFilePath) {
	this.CONFIG_FILE = configFilePath;
	this.readConfig();
}	
ConfigMngr.prototype.getUID = function() {
	return this.uuidGen.generate();
}	
ConfigMngr.prototype.isObject = function(objStr) {
  return (typeof objStr === "object" && !Array.isArray(objStr) && objStr !== null);
}
ConfigMngr.prototype.convertToObject = function(objStr) {
	return JSON.parse(objStr);
}
ConfigMngr.prototype.deleteConfig = function(obj) {
	for (var i = 0; i < this.config.length; i++) {
		if(this.config[i].uuid === obj.uuid) {
			this.config.splice(i, 1);
		}
	}	
	return this;
}	
ConfigMngr.prototype.generateUuid = function() {
	return this.uuidGen.v1();
}	
ConfigMngr.prototype.insert = function(obj) {
	console.dir('--insert--');
	console.dir(this.config);
	console.dir(obj);

	if (this.isConfigExists(obj)) {
		console.dir('--Calling updateConfig--');
		this.updateConfig(obj);
	} else {
		console.dir('--Else--');
		this.config.push(obj);
	}
	return this;
}
ConfigMngr.prototype.readConfig = function() {
	try{
       this.config = JSON.parse(this.fs.readFileSync(this.CONFIG_FILE, 'utf8'));
    }catch(e){
        console.dir('File is empty or Data in file is not valid content');
    }
	return this;
}
ConfigMngr.prototype.writeConfig = function() {
	var that = this;
	console.dir('--writeConfig--');
	console.dir(that.config);
	console.dir('--writeConfig--');
	this.fs.truncate(this.CONFIG_FILE, 0, function(){
		console.dir('---truncateSync---');
		that.fs.appendFile(that.CONFIG_FILE, that.getJson(), function (err) {
			console.dir('---appendFile---');
		});
	});
	return this;
}	
ConfigMngr.prototype.isConfigExists = function(obj) {
	var exists = false;
	console.dir('--isConfigExists--');
	for (var i = 0; i < this.config.length; i++){
		console.dir('+++++++++++++++isConfigExists++++++++++++++++++++++++++++++');
		console.dir(this.config[i].uuid);
		console.dir(obj.uuid);
		console.dir('++++++++++++++++++isConfigExists+++++++++++++++++++++++++++');
		if(this.config[i].uuid === obj.uuid) {
			exists = true;
		}
	}	
	return exists;
}
ConfigMngr.prototype.updateConfig = function(obj) {
	console.dir('----updateConfig----');
	for (var i = 0; i < this.config.length; i++) {
		if(this.config[i].uuid === obj.uuid) {
			for (var key in obj){
				this.config[i][key] = obj[key];
			}
		}
	}	
	console.dir(this.config);
	console.dir('----updateConfig----');
	return this;
}		
ConfigMngr.prototype.getBasicStruct= function(objStr) {
    var config = {};
	config.uuid = "";
	config.connectionName = "";
	config.ipaddress = "";
	config.port = 0;

	return config;
}
ConfigMngr.prototype.getBasicStructAsString = function() {
    return JSON.stringify(this.getBasicStruct());
}
ConfigMngr.prototype.test = function(args) {
	console.dir('This is test----------------------');
	console.dir(args);
}
ConfigMngr.prototype.getJson = function() {
	console.dir('This is getJson----------------------');
	console.dir(this.config);
	return JSON.stringify(this.config);
}
module.exports = ConfigMngr;

	

