/* 
	Create database, create collection and drop collection
*/
var adminuser = "admin";
var adminpass = "admin";
var server = "localhost";
var port   = 27017; 
var dbName = "myNewCreation";
var mongodb          = require('mongodb');
var mongoClient = mongodb.MongoClient;
var connString = "mongodb://"+server+":"+port+"/"+dbName;

mongoClient.connect(connString, function(err, db) {
    console.dir(err);
    if(!err) {
    	var collectionName = "employee";
///////////////////FIRST TYPE PF INSERTING CONTNET TO COLLECTION//////////////////    	
    	//create collection
    	// var collection = db.collection(collectionName);
    	//insert into collection
  //   	collection.insert(
		// {
		// 	empName:'simon',
		// 	Dob:'01-01-1800',
		// 	salary: '2000'
		// });

		// collection.insert(
		// {
		// 	empName:'rinse',
		// 	Dob:'01-01-1700',
		// 	salary: '3500'
		// });

///////////////////Second TYPE PF INSERTING CONTNET TO COLLECTION//////////////////
		db.collection(collectionName).insert(
		{
			empName:'riyke',
			Dob:'20-31-2300',
			salary: '7000'
		});
}
    else{
        console.log("Mongo DB could not be connected");
        process.exit(0);
    }
    db.close();
});