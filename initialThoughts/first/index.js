var fs = require('fs');

fs.readFile('.././def.txt', function(err, data){
	console.log("Error is the " + err);
	console.log("Data is the " + data);
});

console.log('I came here');