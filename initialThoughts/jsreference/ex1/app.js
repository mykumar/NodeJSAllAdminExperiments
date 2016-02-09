var a  = {};
a.name = "Jessie";
a.age = 22;

var clone = Object.assign({}, a);
var tarray = [];
tarray.push(clone);

console.dir('------------------before-------------------------------------');
console.dir(tarray);


a.name = "Monica";
a.age = 18;

var clone = Object.assign({}, a);
tarray.push(clone);

console.dir('------------------After-------------------------------------');
console.dir(tarray);

a.name = "Rose";
a.age = 16;

var j = (JSON.parse(JSON.stringify(a)));


tarray.push(j);
console.dir('------------------After JSON Parse Cloning-------------------------------------');
console.dir(tarray);


a.name = "Merry";
a.age = 27;

tarray.push(jQuery.extend({}, a));
console.dir('------------------After jQuery Cloning-------------------------------------');
console.dir(tarray);