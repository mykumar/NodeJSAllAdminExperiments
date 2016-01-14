var Q = require('q');
var fs = require('fs');
console.dir('This is the begining of the program');
function printFileContent() {
var deferred = Q.defer();
fs.readFile('./abc1.txt', 'utf-8', function (err, data) {
  if (err) {
        console.log("This is the error in fs read file callback");
        deferred.reject(err);
    } else {
    	console.log("This is the success in fs read file callback");
        console.log(data);
        deferred.resolve(data);
    }
});
return deferred.promise;
}
printFileContent().then(function(collection) {
		console.dir('This is the then success');
		console.dir(collection);
}).fail(function(err){
// If Error accrued. 
	console.dir('This is the then error');
	console.dir(err);
});

console.dir('This is the end of the program');