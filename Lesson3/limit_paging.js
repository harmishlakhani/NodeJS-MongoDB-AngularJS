var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

mongo.connect("mongodb://localhost/test", function(err, db) {
	var myDB = db.db("words");
	
	myDB.collection("word_stats", function(err, collection) {
		pageResults(collection, 0);
		
		setTimeout(function(){ myDB.close(); }, 3000);
	});
});

function displayCursor(cursor, callback, collection, skip) {
	cursor.toArray(function(err, itemArr){
		var wordStr = "";
		for(var i in itemArr) {
			wordStr += itemArr[i].word + ", "
		}
		console.log(wordStr);
		callback(collection, skip);
	});
}

function pageResults(collection, skip) {
	var query = {'first' : 'h'};
	var options = {limit : 1, skip : skip};

	collection.find(query, options, function(err, cursor) {
		cursor.count(true, function(err, count) {
			if(count > 0) {
				var pageStart = skip + 1;
				var pageEnd = skip + count;
				console.log("Page start : " + pageStart + " to Page End : " + pageEnd);
				displayCursor(cursor, pageResults, collection, pageEnd);
			}
		});
	});
}