var express = require('express');
var app = express();

app.use('/', express.query());

app.get('/', function(req, res){
	var response = "<h2>Your Query parameters</h2>";
	response += JSON.stringify(req.query);
	res.send(200, response);
});

app.listen(80);