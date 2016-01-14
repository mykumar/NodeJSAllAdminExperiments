var singleton1 = require('./singletonUser1');
console.dir(singleton1.getlocalvariable());
singleton1.setlocalvariable(20);
console.dir(singleton1.getlocalvariable());

var singleton2 = require('./singletonUser2');
console.dir(singleton2.getlocalvariable());
singleton2.setlocalvariable(30);
console.dir(singleton.getlocalvariable());
// console.dir(singleton.localvariable);
// console.dir(singleton.returnVariable);
 // var instance1 = singleton.getInstance();