
// var jsonString = 	'[{"connectionName" : "conn1", "ipaddress" : "127.0.0.1","port" : "80"}, {"connectionName" : "conn2", "ipaddress" : "127.0.0.100","port" : "760"}]';
// var a  = JSON.parse(jsonString);
// a.splice(1, 1);
// console.dir(a);
// var obj = {"connectionName" : "conn3", "ipaddress" : "127.0.0.100","port" : "760"};
// a.push(obj); 
// console.dir(a);
// process.exit();


// var shortid = require('shortid');

// console.log(shortid.generate());
// console.log(shortid.generate());
// console.log(shortid.generate());
// console.log(shortid.generate());
// process.exit();
 
// var uuid = require('shortid');;

var configMngrClass = require('./configManager');
var configManager = new configMngrClass();

// console.dir(configManager.getUID());


configManager.init('./exfile.config');

var u = configManager.getUID();
console.dir(u);

var config = {};

config.uuid = u;
config.connectionName = "connobj1";
config.ipaddress = "127.0.0.1";968
config.port = 80;

configManager.insert(config);

var u1 = configManager.getUID();
console.dir('++++++++++++++++++++++++++++++Generate++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=');
console.dir(u);
console.dir(u1);
console.dir('++++++++++++++++++++++++++++++Generate++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=');
var config1 = {};
config1.uuid = u1;
config1.connectionName = "connobj2";
config1.ipaddress = "127.0.0.1";
config1.port = 80;
console.dir('++++++++++++++++++++++++++++++CONFIG++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=');
console.dir(config1);
console.dir('++++++++++++++++++++++++++++++CONFIG++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=');

configManager.insert(config1);

console.dir('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=');

configManager.getJson();
console.dir('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=');

config.uuid = u;
config.connectionName = "This is mpdified";
config.ipaddress = "127.0.0.1";
config.port = 80;

configManager.insert(config).writeConfig();
configManager.getJson();

setTimeout(function(){
	console.dir('First timer');
	console.dir(configManager.readConfig().getJson());
}, 3000);



// console.dir(configManager.generateUuid());
// var a = '{"connectionName" : "conn1", "ipaddress" : "127.0.0.1","port" : "80"}';
// configManager.getBasicStructFromObject(configManager.convertToObject(a));

// var u = uuid.v1();
// console.dir(u);
// var config = {};
// config.uuid = u;
// config.connectionName = "connobj1";
// config.ipaddress = "127.0.0.1";
// config.port = 80;

// configManager.insert(config);
// console.dir(configManager.getJson());

// config.connectionName = "NEWCONN";
// configManager.insert(config);
// console.dir(configManager.getJson());

// var config = {};
// config.uuid = uuid.v1();
// config.connectionName = "connobj1";
// config.ipaddress = "127.0.0.1";
// config.port = 80;

// configManager.insert(config);
// console.dir(configManager.getJson());

// console.dir(configManager.getBasicStructAsString());

// console.dir(configManager.readConfig().getJson());
// var config = {};
// config.uuid = "123456";
// config.connectionName = "Joy of the joy";
// config.ipaddress = "127.0.0.1";
// config.port = 80;



// configManager.insert(config).writeConfig();

// console.dir(configManager.getJson());

// setTimeout(function(){
// 	console.dir(configManager.readConfig().getJson());
// }, 3000);
