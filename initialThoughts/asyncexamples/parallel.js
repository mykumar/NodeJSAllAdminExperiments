var async = require('async');

var callmes = [
    function one(callback) {
        callback(null, 'abc', "DEF");
    },
    function two(arg1,arg2, callback) {
    	console.log('I got the argument from the firstb functiokn ' + arg1);
    	console.log('I got the argument from the firstb functiokn ' + arg2);
        callback(null, 'xyz\n');
    }
];

async.waterfall(callmes, function(err, results) {
    // results is now equals to: {one: 'abc\n', two: 'xyz\n'}
    console.dir(results);
});

