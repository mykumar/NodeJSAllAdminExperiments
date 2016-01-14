// Library dependencies
var mysql = require('mysql'),
    mysqlUtilities = require('mysql-utilities'),
    async = require('async'),
    wait=require('wait.for');;

var main = require('./mainDb');
// var jsonDb = new main();   

// var connectionParams = {};
// connectionParams.name =  'Connection'; 
// connectionParams.host =  'localhost';
// connectionParams.user =   'root';
// connectionParams.password =   'newpwd';
// connectionParams.database =   'timetrack';
var connection = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: 'newpwd',
    database: 'timetrack'
});

connection.connect();

// jsonDb.createConnection(connectionParams,jsoncallback);

// Mix-in for Data Access Methods and SQL Autogenerating Methods
mysqlUtilities.upgrade(connection);

// Mix-in for Introspection Methods
mysqlUtilities.introspection(connection);

// jsonDb.startTask();



function anyStandardAsync(param, callback){
    setTimeout( function(){
                  callback(null,'hi '+param);
        }, 5000);
};

function  testFunction(){
    console.log('fiber start');
    var result = wait.forMethod(connection,'query','show columns from work;');
    console.dir(result);
    console.log('fiber end');
};

console.log('app start');
wait.launchFiber(testFunction);
console.log('after launch');




// connection.query('show columns from work;', function(err, rows, fields) {
//   if (err) throw err;
  // console.dir(rows);
  // rows.forEach(function(entry) {
  //       console.log(entry.Field);
  //  });
  // console.dir(fields);
  // console.log('The solution is: ', rows[0].solution);
// });

// function anyStandardAsync(param, asynccallback){
//             async.series
//             (
//                 [  
//                     function(callback)
//                     {
//                         connection.databases(function(err, databases) {
//                             console.log("=======================FIRST=============================");
//                             databases.forEach(function(database) {
//                                 var databaseParams = {};
//                                 databaseParams.name =  database; 
//                                 jsonDb.createDatabase(databaseParams, jsoncallback);
//                             });
//                             callback();
//                         });
//                     }
//                     ,
//                     function(callback)
//                     {
//                         console.log("=======================SECOND=============================");
//                         var databaseNames = jsonDb.getDatabaseNames();
//                         databaseNames.forEach(function(database) {
//                             if(database == 'timetrack') {
//                                 connection.databaseTables(database, function(err, tables) {
//                                     for (var table in tables) {
//                                         var tableParams = {};
//                                         tableParams.name =  table;
//                                         jsonDb.createTable(tableParams, jsoncallback);
//                                     }    
//                                     callback();
//                                 });
//                             }    
//                         });
//                     }
//                 ], 
//                 function (err, results) {
//                     console.dir('-----------------------------------baby we completed---------------');
                    
//                     var str = JSON.stringify(jsonDb);
//                     console.dir(str);
//                     // Release connection
//                     connection.end();
//                     console.dir('-----------------------------------baby we completed---------------');
//                     jsonDb.endTask();
//                     asynccallback(null,'hi '+param);
//                 }
//             ); 
// };
// // var sql    = 'show columns from ' + 'work';
// // connection.query(sql, function (error, rows, fields) {
// //     async.map(rows, getUsers, function(err, results){
// //         console.dir('-----------------this is callback function--------------');
// //         console.dir(JSON.stringify(results));
// //     });
// // });


// function jsoncallback(err, results){
//     // console.dir(err);
//     // console.dir(results);
// }

// function  testFunction(){
//     console.log('fiber start');
//     var result = wait.for(anyStandardAsync,'test');
//     console.log('function returned:', result);
//     console.log('fiber end');
// };

// console.log('app start');
// wait.launchFiber(testFunction);
// console.log('after launch');


//     // console.dir('--------------while looop-------------------------');
//     // wait.miliseconds(10*1000);
// // }
//     console.dir('--------------LAST-------------------------');
//     var str = JSON.stringify(jsonDb);
//     console.dir(str);
//     console.dir('--------------LAST-------------------------');


// Release connection
// connection.end();

