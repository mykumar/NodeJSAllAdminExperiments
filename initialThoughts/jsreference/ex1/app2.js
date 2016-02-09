var a  = [{"name" : "Jessie", "Age" : 22}];


var tarray = [];
var clone = Object.assign({}, a[0]);
tarray.push(clone);

console.dir('------------------before-------------------------------------');
console.dir(a);
console.dir(tarray);


a[0].name = "Monica";
a[0].Age = 18;

clone = Object.assign({}, a[0]);
tarray.push(clone);

console.dir('------------------After-------------------------------------');
console.dir(a);
console.dir(tarray);




