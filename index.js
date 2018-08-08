var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var pacmanyj = require('./pacmanyj');

app.use(express.static('./'));

http.listen(3000, function () {
  console.log('listening on *:3000');
});

io.on('connection', function (socket) {
  pacmanyj.iniciarJuego(io, socket);
});