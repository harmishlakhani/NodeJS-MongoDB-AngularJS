var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

mongo.connect("mongodb://localhost/test", function(err, db) {
	var myDB = db.db("words");
	
	myDB.collection("word_stats", function(err, collection) {
		findOne(collection);
		setTimeout(function(){ myDB.close(); }, 3000);
	});
});

function findOne(collection) {
	var query = {};
	collection.findOne(query, function(err, item) {
		console.log(item);
	});
}