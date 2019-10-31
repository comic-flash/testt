var http = require('http'),
    path = require('path'),
    express = require('express')
   


// Create global app object
var app = express();


// Normal express config defaults


app.use(express.static(__dirname));

// finally, let's start our server...
var server = app.listen( process.env.PORT || 80, function(){
  console.log('Listening on port ' + server.address().port);
});
