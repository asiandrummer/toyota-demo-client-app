
//qwest.get('/connect')
qwest.get('http://hyo.cloudapp.net:8080/examples/rpc')
  .then(function(res) {
    console.log(res);
  });
