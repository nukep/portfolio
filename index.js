var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/build'));
// For source maps
app.use('/src', express.static(__dirname + '/src'));

app.listen(3000, function() {
	console.log('Server is listening');
});
