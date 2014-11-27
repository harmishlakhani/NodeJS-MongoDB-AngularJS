var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

mongo.connect("mongodb://localhost/test", function(err, db) {
	var myDB = db.db("words");
	
	myDB.collection("word_stats", function(err, collection) {
		showNewDocs(collection, addFacebookAndTweet);
		
		setTimeout(function(){ myDB.close(); }, 3000);
	});
});

function showNewDocs(collection, callback) {
	var query = {'category' : 'New'};
	collection.find(query, function(err, items) {
		items.toArray(function(err, itemsArr){
			console.log("New Documents: ");
			for(var i in itemsArr) {
				console.log(itemsArr[i]);
			}
			if(callback) {
				callback(collection);
			}
		});
	});
}

function addFacebookAndTweet(collection) {
	var facebook = {
			'word' : 'facebook',
			'first' : 'f',
			'last' : 'l',
			size : 8,
			letters : ['f', 'a', 'c', 'e', 'b', 'o', 'o', 'k'],
			stats : {vowels : 4, consenants : 4},
			category : 'New'
			};
	
	var tweet = {
			'word' : 'tweet',
			'first' : 't',
			'last' : 't',
			size : 5,
			letters : ['t', 'w', 'e', 'e', 't'],
			stats : {vowels : 2, consenants : 3},
			category : 'New'
			};
	var options = {w:1, wtimeout:5000, journal:true};
	collection.insert([facebook,  tweet], options, function(err, results) {
		console.log("Insert results : " + results);
		
		showNewDocs(collection, removeNewDocs);
	});
}

function removeNewDocs(collection) {
	var query = {'category' : 'New'};
	var options = {w:1, wtimeout:5000, journal:true};
	collection.remove(query, options, function(err, results) {
		showNewDocs(collection);
	});
}