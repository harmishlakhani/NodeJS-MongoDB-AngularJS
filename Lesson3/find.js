var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

mongo.connect("mongodb://localhost/test", function(err, db) {
	var myDB = db.db("words");
	
	myDB.collection("word_stats", function(err, collection) {
		over4(collection);
		startsWithABH(collection);
		endsWithVowels(collection);
		setTimeout(function(){ myDB.close(); }, 3000);
	});
});

function displayCursor(cursor, msg) {
	cursor.toArray(function(err, itemArr){
		var wordStr = "";
		for(var i in itemArr) {
			wordStr += itemArr[i].word + ", "
		}
		console.log("\n" + msg + "\n" + wordStr);
	});
}

function over4(collection) {
	var query = {'size' : {'$gt' : 4}};
	var cursor = collection.find(query);
	displayCursor(cursor, "words with more than 4 characters");
}

function startsWithABH(collection) {
	var query = {'first' : {'$in' : ["a", "b", "h"]}};
	var cursor = collection.find(query);
	displayCursor(cursor, "words start with a, b and h char");
}

function endsWithVowels(collection) {
	var query = {'last' : {'$in' : ["a", "e", "i", "o", "u"]}};
	var cursor = collection.find(query);
	displayCursor(cursor, "words ends with vowels");
}