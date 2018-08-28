var io;
var gameSocket;
var maze = require('amazejs');

exports.iniciarJuego = function(sio, socket){
    io = sio;
    gameSocket = socket;

    gameSocket.emit('connected', { message: "You are connected!" });

    gameSocket.on('hostCreateNewGame', hostCreateNewGame);
    gameSocket.on('hostRoomFull', hostPrepareGame);
    gameSocket.on('hostCountdownFinished', hostStartGame);
    gameSocket.on('hostNextRound', hostNextRound);
    gameSocket.on('playerJoinGame', playerJoinGame);

    //PLAYER EVENTS
    gameSocket.on('playerKeyUp', playerKeyUp);
};

function hostCreateNewGame(data){
  var thisGameId = ( Math.random() * 100000 ) | 0;

  // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
  this.emit('newGameCreated', {gameId: thisGameId, mySocketId: this.id});

  // Join the Room and wait for the players
  this.join(thisGameId.toString());
}

function hostPrepareGame(gameId) {
  var sock = this;
  var l1 = new maze.Backtracker(15, 25);
  l1.generate();
  var l2 = new maze.Backtracker(15, 25);
  l2.generate();
  var data = {
      mySocketId : sock.id,
      gameId : gameId,
      lab1 : Object.freeze(l1), 
      lab2 : Object.freeze(l2)
  };
  console.log(data.lab1.__proto__)
  io.sockets.in(data.gameId).emit('beginNewGame', data);
}

function hostStartGame(gameId){

}

function hostNextRound(data){

}

function playerJoinGame(data) {
  // A reference to the player's Socket.IO socket object
  var sock = this;
  // Look up the room ID in the Socket.IO manager object.
  var room = io.sockets.adapter.rooms[data.gameId];

  // If the room exists...
  if( room != undefined ){
      // attach the socket id to the data object.
      data.mySocketId = sock.id;
      // Join the room
      sock.join(data.gameId);
      // Emit an event notifying the clients that the player has joined the room.
      io.sockets.in(data.gameId).emit('playerJoinedRoom', data);

  } else {
      // Otherwise, send an error message back to the player.
      this.emit('error',{message: "This room does not exist."} );
  }
}

function playerKeyUp(data){
  io.sockets.in(data.gameId).emit('hostCheckMove', data);
}

