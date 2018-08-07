var io;
var gameSocket;


exports.iniciarJuego = function(sio, socket){
    io = sio;
    gameSocket = socket;

    gameSocket.on('room', aniadirNodoALaSala)
};

function aniadirNodoALaSala(data){
    console.log(data);
    var rooms = io.sockets.adapter.rooms[data];
        var numeroNodos = (rooms === undefined) ? 0 : rooms.length;
        if (numeroNodos === 0) {
          this.join(data);
          io.sockets.in(rooms).emit('joined', data);
        }else if(numeroNodos < 4){
          this.join(data);
          io.sockets.in(rooms).emit('joined', data);
        }else if(numeroNodos === 3){
          this.join(data);
          io.sockets.in(rooms).emit('start', data);
        }else{
          this.emit('full','Sala llena');
        }
}