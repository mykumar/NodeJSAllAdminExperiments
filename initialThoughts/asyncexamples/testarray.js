// "use strict";
var testArray = function() {
	this.newarr = [];
}
testArray.prototype.createSubArray = function (index1,index2 ) {
  		if(index2 == -1) {
  			this.newarr[index1] = {}; 
  		} else {
  			this.newarr[index1][index2] = {};
  		}
}
testArray.prototype.putContent = function (index1,index2,content ) {
  		if(index2 == -1) {
  			this.newarr[index1][content] = content; 
  		} else {
  			this.newarr[index1][index2][content] = content;
  		}
}
testArray.prototype.printArray =function() {
	console.dir(this.newarr);
}
module.exports = testArray;

// var Foo = function() { };
// Foo.prototype.bar = function() { console.log('This is the barrr'); };
// module.exports = Foo;
