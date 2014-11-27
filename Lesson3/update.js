var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

mongo.connect("mongodb://localhost/test", function(err, db) {
	var myDB = db.db("words");
	
	myDB.collection("word_stats", function(err, collection) {
		showWord(collection, updateDoc);
		
		setTimeout(function(){ myDB.close(); }, 3000);
	});
});

function showWord(collection, callback) {
	var query = {'word' : {'$in' : ['harmish', 'google']}};
	collection.find(query, function(err, items) {
		items.toArray(function(err, itemsArr){
			console.log(itemsArr);
			if(callback) {
				callback(collection);
			}
		});
	});
}

function updateDoc(collection) {
	var query = {'word' : 'harmish'};
	
	var update = {
			'$set' : {'word' : 'hclakhani'},
			'$inc' : {'size' : 1, 'stats.consenants' : 1},
			'$push' : {'letters' : 'y'}
	};
	
	var options = {w:1, wtimeout:5000, journal:true, upsert : false, multi : false};
	collection.update(query, update, options, function(err, results) {
		console.log("Updating Doc results : " + results);
		console.log("After Updating");
		showWord(collection, resetDoc);
	});
}

function resetDoc(collection) {
	var query = {'word' : 'hclakhani'};

	var update = {
			'$set' : {'word' : 'harmish'},
			'$inc' : {'size' : -1, 'stats.consenants' : -1},
			'$pop' : {'letters' : 1}
	};
	
	var options = {w:1, wtimeout:5000, journal:true, upsert : false, multi : false};
	collection.update(query, update, options, function(err, results) {
		console.log("Reset Doc results : " + results);
		console.log("After reseting");
		showWord(collection);
	});
}