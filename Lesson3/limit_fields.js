var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

mongo.connect("mongodb://localhost/test", function(err, db) {
	var myDB = db.db("words");
	
	myDB.collection("word_stats", function(err, collection) {
		displayFullDocument(collection);
		excludeFields(collection);
		includeFields(collection);
		
		setTimeout(function(){ myDB.close(); }, 3000);
	});
});

function displayFullDocument(collection) {
	var query = {word : "harmish"};
	collection.findOne(query, function(err, word) {
		console.log("Full word : ");
		console.log(word);
	});
}

function excludeFields(collection) {
	var query = {word : "harmish"};
	var fieldsToExclude = {letters : false, stats : false};
	var options = {fields : fieldsToExclude};
	collection.findOne(query, options, function(err, word) {
		console.log("Excluding letters and stats : ");
		console.log(word);
	});
}

function includeFields(collection) {
	var query = {word : "harmish"};
	var fieldsToInclude = {size : true, word : true};
	var options = {fields : fieldsToInclude};
	collection.findOne(query, options, function(err, word) {
		console.log("Includiing size and word : ");
		console.log(word);
	});
}