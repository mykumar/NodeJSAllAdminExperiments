var async = require('async');

console.dir('This is the begining of the program');

// async.map([1,2,3,4,5], justAddOne, asyncMapCompleted);
async.map([1,2,3,4,5], async.ensureAsync( justAddOne ), asyncMapCompleted);
console.dir('async map completed');
function justAddOne(number, callback) {
    callback(null, ++number);
}
function asyncMapCompleted(error, result) {
  console.log("map completed. Error: ", error, " result: ", result);
}

async.mapSeries([6,7,8,9], justAddOne, asyncMapCompleted);

console.dir('This is the end of the program');