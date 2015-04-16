require('./polyfills.js');

var express = require('express');
var request = require('request');
var app = express();

var connectionInfos = {};

var getConnectionCount = function() {
  return Object.keys(connectionInfos.length).length;
};

//app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/public'));
app.use('/src', express.static(__dirname + '/src'));

app.get('/', function(req, res) {
  res.render("index");
});

var server = app.listen(8888, function(req, res) {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
});

