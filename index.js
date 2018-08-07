var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var pacmanyj = require('./pacmanyj');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');;
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});

io.on('connection', function (socket) {
  console.log("Nodo conectado")
  pacmanyj.iniciarJuego(io, socket);
});