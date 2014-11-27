var MongoClient = require('mongodb').MongoClient;

var mongo = new MongoClient();

//Connnection String
//mongodb://username:password@host/database
mongo.connect("mongodb://localhost/test", function(err, db) {
	var myDB = db.db("words");
	
	myDB.collection("word_stats", function(err, collection) {
		countItems(collection);
		setTimeout(function(){ myDB.close(); }, 3000);
	});
});

function countItems(collection) {
	collection.count(function(err, count) {
		console.log("Number of items : 	" + count);
	});
}