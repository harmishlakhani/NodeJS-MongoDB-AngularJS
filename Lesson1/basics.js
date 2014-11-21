/**
 * This file contains some basics of Javascript.
 */
var msg = "Hello World!!!";
console.log(msg);

var random = Math.floor(10.55);
console.log("Random Number is : " + random);

function display(msg) {
	console.log(msg);
}

var array = ["Harmish", "Lakhani"];
console.log(array[0] + " " + array[1]);

var obj = {fname:"Harmish", lname:"Lakhani"};
console.log(obj.fname + " " + obj.lname);

var os = require('os');
console.log(os.platform);