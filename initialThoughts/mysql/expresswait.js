
var express = require('express');
var app = express();

var mysqlClass = require('./mysql'); 
var mysql = new mysqlClass();   

mysql.init();

app.get('/mysql', function(req,res){
      mysql.waitforLaunchFiber(req, res,'fillMetaDetails');
});
app.get('/mysql/select', function(req,res){
      var obj = {query: "select * from timetrack.work;"};
   	  mysql.waitforLaunchFiber(req, res,'selectQuery', obj);   
});
app.get('/mysql/query', function(req,res){
      var obj = {query: "update timetrack.work set DESCRIPTION = 'This is ID /mysql/query' where id =1;"};
   	  mysql.waitforLaunchFiber(req, res,'query', obj);   
});

app.listen(4000);



