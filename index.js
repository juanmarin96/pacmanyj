var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
    console.log("nodo");
  });


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');;
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});