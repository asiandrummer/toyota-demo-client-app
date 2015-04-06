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

app.use(require('connect-livereload') ({
  port: 35279
}));

app.get('/', function(req, res) {
  // connectionInfos.push(req.headers.host);
  res.render("index");
});

app.get('/connect', function(req, res) {
  request.get('http://hyo.cloudapp.net:8080/examples/rpc')
    .on('response', function(res) {
      console.log(res);
    })
    .on('success', function(res) {
      console.log(res);
    })
    .on('error', function(err) {
      console.log(err);
    });
});

var server = app.listen(8888, function(req, res) {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
});

