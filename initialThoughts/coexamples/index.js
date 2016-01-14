var fs = require('co-fs');
var express = require('express');
var wrap = require('co-express');
var wait = require('co-wait');
var app = express();

app.get('/', wrap(function* (req, res) {
  yield waitAndAnswer(res);
}));

function* waitAndAnswer (res) {
  // yield wait(10000);
  // res.send('Done: ' + Date.now());
  MongoClient = require('mongodb').MongoClient,
  db = yield MongoClient.connect('mongodb://localhost:27017/local');
  // Some docs for insertion
  docs = [{
      		title : "this is my title", by : "bob", likes : 123 ,
      }];
  // Create a collection
  collection = db.collection('mycol');
  
  // Insert the docs
  yield collection.insertMany(docs, {w: 1});  

  db.close();
  res.send('Done: ' + Date.now());
}
app.listen(8000);


