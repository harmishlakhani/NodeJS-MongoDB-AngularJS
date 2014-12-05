var express = require('express');
var ejs = require('ejs');

var app = express();

app.set('views', './views');
app.engine('html', ejs.renderFile);

app.locals = {
	uname:'Harmish',
	vehicle:'Jeep',
	terrain:'Mountains',
	climate:'Dessert',
	location:'Unknown'
};

app.get('/ejs', function(req, res){
	//render template
	app.render('user_ejs.html', function(err, renderedData) {
		res.send(renderedData);
	});
});

app.get('/other', function(req, res){
	var otherLocals = {
			uname : 'Hcl',
			vehicle:'Huricane'
	};
	app.render('user_ejs.html', otherLocals, function(err, renderedData) {
		res.send(renderedData);
	});
});

app.listen(80);