var fs = require('fs');

var data = JSON.parse(fs.readFileSync('./exfile.config', 'utf8'));
console.dir(data);
data = JSON.stringify(data);
console.dir(data);

var config = {};
config.uuid = "unique";
config.connectionName = "connobj1";
config.ipaddress = "127.0.0.1";
config.port = 80;
var arr = [];
arr.push(config);

var config = {};
config.uuid = "unique2";
config.connectionName = "connobj1";
config.ipaddress = "127.0.0.1";
config.port = 80;
arr.push(config);

data  = JSON.stringify(arr);
console.dir(data);

fs.truncate('./exfile.config', 0, function(){
	console.dir('---truncateSync---');
	fs.appendFile('./exfile.config', data, function (err) {
		console.dir('---appendFile---');
	});
});