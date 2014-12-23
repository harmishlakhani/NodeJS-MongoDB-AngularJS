var MongoClient = require('mongodb').MongoClient;

var words = null;

MongoClient.connect("mongodb://localhost/", function(err, db) {
	words = db.db("words").collection('word_stats');
});

exports.getWords = function(req, res) {
		if(words) {
			//add regex for filtering
			words.find({word: new RegExp(req.query.contains, 'i')}, 
					{limit: req.query.limit, 
					 skip: req.query.skip,
					 sort: getSortObj(req)}, 
					function(err, cursor){
						cursor.toArray(function(err, wordsArr){
								res.json(wordsArr);
						});
				});
		} else {
			res.json(503, {});
		}
};

function getSortObj(req) {
	var field = "word";
	if(req.query.sort === 'Vowels'){
		field = 'stats.vowels';
	} else if(req.query.sort === 'Length') {
		field = 'size';
	} else {
		field = req.query.sort.toLowerCase();
	}
	
	return [[field, req.query.direction]];
}