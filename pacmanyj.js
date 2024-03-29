var io;
var gameSocket;
var maze = require('amazejs');
exports.iniciarJuego = function (sio, socket) {
  io = sio;
  gameSocket = socket;

  gameSocket.emit('connected', {
    message: "You are connected!"
  });

  gameSocket.on('hostCreateNewGame', hostCreateNewGame);
  gameSocket.on('hostRoomFull', hostPrepareGame);
  gameSocket.on('hostCountdownFinished', hostStartGame);
  gameSocket.on('hostNextRound', hostNextRound);
  gameSocket.on('playerJoinGame', playerJoinGame);
  gameSocket.on('gameOver', gameOver);

  //PLAYER EVENTS
  gameSocket.on('playerKeyUp', playerKeyUp);
};

function hostCreateNewGame(data) {
  var thisGameId = (Math.random() * 100000) | 0;

  // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
  this.emit('newGameCreated', {
    gameId: thisGameId,
    mySocketId: this.id
  });

  // Join the Room and wait for the players
  this.join(thisGameId.toString());
}


function gameOver(data){
  io.sockets.in(data.gameId).emit('endGame', data);
}

function hostPrepareGame(data) {
  var sock = this;
  var l1 = new maze.Backtracker(15, 25);
  l1.generate();
  l1.set(23, 13, 2)
  var l2 = new maze.Backtracker(15, 25)
  l2 = Object.assign(l2, l1)
  l2.set(23, 13, 2)
  var data = {
    mySocketId: sock.id,
    gameId: data.id,
    lab1: l1,
    lab2: l2,
    players: data.players,
    nextRound: data.nextRound
  };
  io.sockets.in(data.gameId).emit('beginNewGame', data);
}

function hostStartGame(gameId) {

}

function hostNextRound(data) {

}

function playerJoinGame(data) {
  // A reference to the player's Socket.IO socket object
  var sock = this;
  // Look up the room ID in the Socket.IO manager object.
  var room = io.sockets.adapter.rooms[data.gameId];

  // If the room exists...
  if (room != undefined) {
    // attach the socket id to the data object.
    data.mySocketId = sock.id;
    // Join the room
    sock.join(data.gameId);
    // Emit an event notifying the clients that the player has joined the room.
    io.sockets.in(data.gameId).emit('playerJoinedRoom', data);

  } else {
    // Otherwise, send an error message back to the player.
    this.emit('error', {
      message: "This room does not exist."
    });
  }
}

function playerKeyUp(data) {
  var retorno = validarMovimientoJugador(data);
  io.sockets.in(data.gameId).emit('hostCheckMove', retorno);

}

function validarMovimientoJugador(data) {
  var rowAux = data.row;
  var colAux = data.col;
  moverIndice(data);
  if (validarPosicionEnLaberinto(data)) {

    return data;
  } else {
    data.row = rowAux;
    data.col = colAux;
    return data;
  }
}

function validarPosicionEnLaberinto(data) {
  var l1 = new maze.Backtracker(data.lab1.width, data.lab1.height);
  l1 = Object.assign(l1, data.lab1);
  var l2 = new maze.Backtracker(data.lab2.width, data.lab2.height);
  l2 = Object.assign(l2, data.lab2);
  if (data.j === 1) {
    if (l1.get(data.row, data.col)) {
      if (l1.get(data.row, data.col) === 2) {
        data.row = 1;
        data.col = 1;
        io.sockets.in(data.gameId).emit('playerWin', data);        
      }
      return true;
    } else {
      return false;
    }
  } else {
    if (l2.get(data.row, data.col)) {
      if (l2.get(data.row, data.col) === 2) {
        data.row = 1;
        data.col = 1;
        io.sockets.in(data.gameId).emit('playerWin', data);
      }
      return true;
    } else {
      return false;
    }
  }
}

function moverIndice(data) {
  switch (data.codigoTecla) {
    case 38:
      data.row -= 1
      break;
    case 40:
      data.row += 1
      break;
    case 37:
      data.col -= 1
      break;
    case 39:
      data.col += 1
      break;
    default:
      break;
  }
}