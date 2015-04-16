// function createCORSRequest(method, url) {
//   var xhr = new XMLHttpRequest();
//   if ("withCredentials" in xhr) {
//     // "withCredentials" only exists on XMLHTTPRequest2 objects.
//     xhr.open(method, url, true);
//   } else if (typeof XDomainRequest != "undefined") {
//     // Otherwise, check if XDomainRequest.
//     // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
//     xhr = new XDomainRequest();
//     xhr.open(method, url);
//   } else {
//     // Otherwise, CORS is not supported by the browser.
//     xhr = null;
//   }
//   return xhr;
// }
//
// var xhr = createCORSRequest('GET', url);
//
// xhr.onload = function() {
//   var res = xhr.responseText;
//   console.log(res);
// };
//
// xhr.send();
//
// var vehicleForm = document.querySelector('.vehicle-form');
// var postBtn = document.querySelector('.post-button');
//
// postBtn.addEventListener('click', function(e) {
//   var postXHR = createCORSRequest('POST', url);
//   postXHR.onload = function() {
//     var res = postXHR.responseText;
//     console.log(res);
//   };
//
//   var formData = new FormData();
//   formData.append("name", "test");
//   postXHR.send(formData);
// });
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

var url = 'http://hyo.cloudapp.net:8080/examples/rpc';
$.ajax({
  type: 'GET',
  url: url,
  contentType: 'text/plain',
  xhrFields: {
    withCredentials: false
  },
  success: function(response) {
    console.log(response);
  }
});

var $info = $('.info');
var pollServer = function() {
  setInterval(function() {
    console.log('polled');
  }, 5000);
};

var postBtn = document.querySelector('.post-button');

var trigger = false;

postBtn.addEventListener('click', function(e) {
  var name    = document.querySelector('#name').value;
  var speed   = document.querySelector('#speed').value;

  $.ajax({
    type: 'POST',
    url: url,
    data: {
      'name': name,
      'speed': speed
    },
    xhrFields: {
      withCredentials: false
    },
    success: function(response) {
      console.log(response);
      if (!trigger) {
        trigger = true;
        pollServer();
      }
    }
  });
});
