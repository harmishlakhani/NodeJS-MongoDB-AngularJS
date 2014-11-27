var vowelArr = "aeiou";
var consenantArr = "bcdfghjklmnpqrstvwxyz";
var words = "Aren't, Harmish, Lakhani, HCL, anonynmous, mcafee, google, reshma, bboying";
var wordArr = words.split(", ");
var wordObjArr = [];

//Build objects
for(var i = 0; i < wordArr.length; i++) {
	
	try {
		var word = wordArr[i].toLowerCase();
		var vowelCount = ("|" + word + "|").split(/[aeiou]/i).length - 1;
		var consenantCount = ("|" + word + "|").split(/[bcdfghjklmnpqrstvwxyz]/i).length - 1;
		
		var letters = [];
		var vowels = [];
		var consenants = [];
		var others = [];
		
		for(var j = 0; j < word.length; j++) {
			var ch = word[j];
			if(letters.indexOf(ch) === -1) {
				letters.push(ch);
			}
			if(vowelArr.indexOf(ch) !== -1) {
				if(vowels.indexOf(ch) === -1) {
					vowels.push(ch);
				}
			} else if(consenantArr.indexOf(ch) !== -1) {
				if(consenants.indexOf(ch) === -1) {
					consenants.push(ch);
				}
			} else {
				if(others.indexOf(ch) === -1) {
					others.push(ch);
				}
			}
		}
		
		var wordObj = {
				word : word,
				first : word[0],
				last : word[word.length - 1],
				size : word.length,
				letters : letters,
				stats : { vowels : vowelCount, consenants : consenantCount}
		};
		if(others.length) {
			wordObj.othersChars = others;
		}
		wordObjArr.push(wordObj)
	} catch(e) {
		console.log(e);
		console.log(word);
	}
}

//Create and populate DB
var mongo = new Mongo('localhost');
var wordsDB = mongo.getDB('words');
var wordsCol = wordsDB.getCollection('word_stats');
wordsCol.drop();
wordsCol.insert(wordObjArr);
var cursor = wordsCol.find();
print("Items inserted : " + cursor.count());
printjson(cursor.next());