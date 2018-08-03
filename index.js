var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function (socket) {
  socket.on('room', function (room) {

    var rooms = io.sockets.adapter.rooms[room];
    var numeroNodos = (rooms === undefined) ? 0 : rooms.length;
    if (numeroNodos === 0) {
      socket.join(room);
      io.sockets.in(rooms).emit('joined', room);
      console.log(numeroNodos)
    }else if(numeroNodos < 4){
      socket.join(room);
      io.sockets.in(rooms).emit('joined', room);
      console.log(numeroNodos)

    }else{
      socket.emit('full','Sala llena');
    }
  });
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');;
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});