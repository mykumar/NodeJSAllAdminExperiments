var express = require('express');

var app = express(); // the main app
var admin = express(); // the sub app
var dummy = express(); // the sub app

admin.get('/', function (req, res) {
  console.log(admin.mountpath); // /admin
  res.send('Admin Homepage');
});

dummy.get('/', function (req, res) {
  console.log(dummy.mountpath); // /admin
  res.send('dummy Homepage');
});

admin.get('/rise', function (req, res) {
  console.log(admin.mountpath); // /admin
  res.send('Rise Homepage');
});

// app.get('/', function (req, res) {
// 	console.log(admin.mountpath); // /admin
//   	res.send('App Homepage');
//  }); 	

app.use('/admin', admin);
app.use('/', dummy);

app.listen(3000);
