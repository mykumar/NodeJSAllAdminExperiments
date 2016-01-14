	var myCursor = db.mycol.find( { by: 'bob' } );
	while (myCursor.hasNext()) {
	   print(tojson(myCursor.next()));
	}