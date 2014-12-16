var express = require('express');
var app = express();
app.use('/', express.static('./static')).
	use('/images', express.static('../../images'));
app.listen(80);