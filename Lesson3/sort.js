var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

mongo.connect("mongodb://localhost/test", function(err, db) {
	var myDB = db.db("words");
	
	myDB.collection("word_stats", function(err, collection) {
		sortWordsAscending(collection);
		sortWordsDescending(collection);
		sortWordsAscBySize(collection);
		
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

function sortWordsAscending(collection) {
	var query = {'first' : 'h'};
	var sorter = [['word', 1]];
	var cursor =  collection.find(query);
	cursor = cursor.sort(sorter);
	displayCursor(cursor, "Words Ordered ascending");
}

function sortWordsDescending(collection) {
	var query = {'first' : 'h'};
	var sorter = [['word', -1]];
	var cursor =  collection.find(query);
	cursor = cursor.sort(sorter);
	displayCursor(cursor, "Words Ordered descending");
}

function sortWordsAscBySize(collection) {
	var query = {'first' : 'h'};
	var sorter = [['last', 1], ['size', -1]];
	var cursor =  collection.find(query);
	cursor = cursor.sort(sorter);
	displayCursor(cursor, "Words Ordered ascending by last and then by size");
}