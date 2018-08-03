var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
    socket.on('room', function(room) {
      socket.join(room);
      io.sockets.in(room).emit('joined', room);
    });
  });


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');;
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});