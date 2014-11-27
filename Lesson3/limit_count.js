var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

mongo.connect("mongodb://localhost/test", function(err, db) {
	var myDB = db.db("words");
	
	myDB.collection("word_stats", function(err, collection) {
		countWordsStartingWithA(collection);
		setTimeout(function(){ myDB.close(); }, 3000);
	});
});

function countWordsStartingWithA(collection) {
	var query = {first : "a"};
	var cursor = collection.find(query);
	cursor.count(function(err, cnt) {
		console.log("\n  Total words starting with A is : " + cnt);
	});
}