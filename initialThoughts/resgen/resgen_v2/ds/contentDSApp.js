var main = require('./contentDS');
var jsonDb = new main("APPLY");

var extra =  jsonDb.getExtraStruct();
extra.company_name = "orbit remit";

jsonDb.addExtra(extra);
extra.company_name = "changed again";


extra.company_name = "abc";
jsonDb.addExtra(extra);


// console.dir('-------------------------output-------------');
// console.log(jsonDb.json());

// jsonDb.removeExtra();

jsonDb.addSection('Bulltien');

jsonDb.addSection('p1');

console.dir('-------------------------Add Section output -------------');
console.log(jsonDb.json());

jsonDb.removeSection('p1');
jsonDb.addSection('p2');

console.dir('-------------------------Remove Section output -------------');
console.log(jsonDb.json());

console.dir('-------------------------Section Tech version output -------------');
jsonDb.renameSection('Bulltien', 'Bulltien - Changed');
jsonDb.setSection('p2');
// var a = jsonDb.getTechVersionStruct('angularjs','v1','hhsjdhjsakhdsahdka');
// console.dir(a);
jsonDb.addTechVersion(jsonDb.getTechVersionStruct('angularjs','v1','hhsjdhjsakhdsahdka'));
jsonDb.addTechVersion(jsonDb.getTechVersionStruct('angularjs','v1','hhsjdhjsakhdsahdka'));
jsonDb.addTechVersion(jsonDb.getTechVersionStruct('Jquery','v2','hhsjdhjsakhdsahdka'));
jsonDb.setSection('Bulltien - Changed');
jsonDb.addTechVersion(jsonDb.getTechVersionStruct('angularjs','v1','hhsjdhjsakhdsahdka'));
jsonDb.addTechVersion(jsonDb.getTechVersionStruct('angularjs','v4','hhsjdhjsakhdsahdka'));
jsonDb.addTechVersion(jsonDb.getTechVersionStruct('Jquery','v2','hhsjdhjsakhdsahdka'));

console.log(jsonDb.json());
// jsonDb.removeAllTechFromSection('Jquery');

jsonDb.removeTechVersion('angularjs','v1');
// jsonDb.removeTechVersion('angularjs','v1');

// jsonDb.removeAllTechFromSections('angularjs');
jsonDb.removeAllTechFromSections('Jquery');


console.dir('-------------------------Final output -------------');
console.log(jsonDb.json());
process.exit();

