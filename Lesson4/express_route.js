var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send("Get Index");
});

app.get('/authors', function(req, res){
	res.send("Get Authors");
});

app.get(/^\/book\/(\w+)\:(\w+)?$/, function(req, res){
	var response = 'Get Book : <br>Chapter : ' + req.param[0]
					+'<br>Page : ' + req.param[1];
	res.send(response);
});

app.get('userid', function(req, res, next, value){
	console.log("\n Request received with userid: " + value);
	next();
});

app.get('/user/:userid', function(req, res){
	var response = 'Get User : ' + req.param('userid');
	res.send(response);
});
app.listen(80);