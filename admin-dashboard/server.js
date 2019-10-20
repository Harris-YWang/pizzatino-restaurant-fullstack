
var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 8088);

var server = app.listen(app.get('port'), function() {
  console.log('listening on port:', server.address().port, '. View the web: http://localhost:8088');
});