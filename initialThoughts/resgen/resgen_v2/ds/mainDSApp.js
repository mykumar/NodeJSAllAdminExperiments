var main = require('./mainDS');
var jsonDb = new main();

process.exit();

var techParams = {};
techParams.name =  'Angular JS'; 
techParams.desc = "Angular JS by google",
jsonDb.createTech(techParams);

techParams.name =  'JQuery'; 
techParams.desc = "Jquery by open source world",
jsonDb.createTech(techParams).setTech('Angular JS');

var sectionParams = {};
sectionParams.name =  'P1'; 
sectionParams.desc = "This is the project for the xerox";
jsonDb.createSection(sectionParams);



// second stage

sectionParams.name =  'P2'; 
sectionParams.desc = "This is the project for the epslon";
jsonDb.createSection(sectionParams).setSection('P2');

var versionParams = {};
versionParams.name =  'V1'; 
versionParams.desc = "Worked on the angular JS Modules";
jsonDb.createVersion(versionParams);

versionParams.name =  'V2'; 
versionParams.desc = "Worked on the angular JS Modules";
jsonDb.createVersion(versionParams);



// Third stage - rename / changes names and desc

console.dir('-------------------------Before Rename-------------');
console.log(jsonDb.json());



jsonDb.changeTechName('Angular JS', 'Google Angular JS');
jsonDb.changeTechDesc('Google Angular JS', 'This is google product called Angular JS');

jsonDb.changeSectionName('P2','P25');
jsonDb.changeSectionDesc('P25','This is the name changed now for section');
jsonDb.setSection('P25');
jsonDb.changeVersionName('V1','V10');
jsonDb.changeVersionDesc('V10','This is chnaged version descritpation');

//fourth stage get
console.dir('-------------------------GET------------------');
// console.dir(jsonDb.getCompleteTech('JQuery'));
var ang = jsonDb.getCompleteTech('Google Angular JS');
ang.name = "New tech";
// console.log(JSON.stringify(ang, null, 4));
jsonDb.addTechStruct(ang);

// var ang = jsonDb.getCompleteSection('Google Angular JS', 'P2');
// ang.name = "Section P2 -- P10 GETT ANGULAR JS";
// console.log(JSON.stringify(ang, null, 4));

// var ang = jsonDb.getCompleteVersion('Google Angular JS', 'P25', 'V10');
// ang.name = "Section P2 -- P10 GETT ANGULAR JS";
// console.log(JSON.stringify(ang, null, 4));




//fifth stage get complete struture
console.dir('-------------------------GET with STRURE-------------');

// var ang = jsonDb.getCompleteSectionWithStruct('Google Angular JS', 'P25');
// ang.name = "Section P2 -- P10 GETT ANGULAR JS";
// console.log(JSON.stringify(ang, null, 4));


// var ang2 = jsonDb.getCompleteVersionWithStruct('Google Angular JS', 'P25', 'V10');
// ang2.name = "Section P2 -- P10 GETT ANGULAR JS";
// console.dir(ang2);
// console.log(JSON.stringify(ang2));


var ang = jsonDb.getAllVersions('Google Angular JS', 'P25');
// ang.name = "Section P2 -- P10 GETT ANGULAR JS";
console.dir(ang);

// for (var key in ang) {
	// console.dir(key);
	// ang[key].id = parseInt(key);
	// console.dir(ang[key]);		
// }	
// console.dir('---AFTER---');
// console.dir(ang);
// console.log(JSON.stringify(ang, null, 4));

console.dir('-------------------------output-------------');
// console.log(jsonDb.json());


process.exit();

