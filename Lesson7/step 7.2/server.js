var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

//external files
require('./routes')(app);

app.listen(80);