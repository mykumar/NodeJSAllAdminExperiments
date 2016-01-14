var async = require("async");

//This is your async worker function
//It takes the item first and the callback second
function addOne(number, callback) {
	console.dir(number);

    if(number instanceof Object) {
    	console.dir('we go an object');
    	// number.last;
    	callback(null, number.last);
	} else {

		callback(null, null);
	}	
}
function extra() {
	console.dir('I am in extra');
}
//The done function must take an error first
// and the results array second
function done(error, result) {
  console.log("map completed. Error: ", error, " result: ", result);
}

async.map([5,6,1,2,3,4,5, {last:extra}], addOne, done);

console.dir('This is the last------------------------------');

async.mapSeries([1,2,3], function (item,callback)
    {
        console.log(item);
        callback(null,true)
    }, function (err,result)
        {
            console.log(result);
        }
);
console.dir('This is the last');