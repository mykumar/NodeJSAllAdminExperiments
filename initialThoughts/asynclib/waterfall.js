var async = require('async');

console.dir('This is the begining of the program');
async.waterfall([
  function(callback){
    callback(null, 'one', 'two');
  },
  function(arg1, arg2, callback){
    callback(null, 'three');
  },
  function(arg1, callback){
    // arg1 now equals 'three' 
    callback(null, 'done');
  }
], function (err, result) {
  // result now equals 'done' 
  console.dir('This is the final method of waterfall');
  console.dir(result);
});

console.dir('This is the end of the program');