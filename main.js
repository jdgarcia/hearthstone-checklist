var express = require('express');
var serveStatic = require('serve-static');

var serve = serveStatic('src', {
  'index': ['index.html']
});
var app = express();
app.use(serve);
app.listen(8080);
