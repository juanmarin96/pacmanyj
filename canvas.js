var maze = require('maze');
var l1;
var l2;
var ctx1;
var ctx2;
var ubicacionActual1 = {r:1,c:1}
var ubicacionActual2 = {r:1,c:1}
function inicializarLaberintos(lab1,lab2){
    l1 = new maze.Backtracker(lab1.width, lab1.height);
    l1 = Object.assign(l1,lab1);
    l2 = new maze.Backtracker(lab2.width, lab2.height);
    l2 = Object.assign(l2,lab2);
    var canvas1 = document.getElementById('canvas1');
    var canvas2 = document.getElementById('canvas2');
    ctx1 = canvas1.getContext('2d');
    ctx2 = canvas2.getContext('2d');
    canvas1.width = l1.width * 20;
    canvas1.height = l1.height * 20;
    canvas2.width = l2.width * 20;
    canvas2.height = l2.height * 20;
    pintarLaberinto(l1,ctx1)
    pintarLaberinto(l2,ctx2)
}


function pintarLaberinto(laberinto, ctx){
    var size = 20;
    ctx.fillStyle = '#ECFFE0';
    for(var row = 0; row < laberinto.height; row++) {
        for(var col = 0; col < laberinto.width; col++) {
          if(laberinto.get(row, col)) {
            ctx.fillRect(col * size, row * size, size, size);
          }
        }
    }
    ctx.fillStyle="red";
    ctx.fillRect(1 * size, 1 * size, 20, 20);

    ctx.fillStyle = "green";
    ctx.fillRect(13 * size, 23 * size, 20, 20);
}

function pintarUbicacionActualJugador(r,c,j){
    if(j === 1){
            ctx1.fillStyle = "#4db6ac";
            ctx1.fillRect(ubicacionActual1.c * 20, ubicacionActual1.r * 20, 20, 20);
            ubicacionActual1.r = r;
            ubicacionActual1.c = c;
            ctx1.fillStyle = "blue";
            ctx1.fillRect(c * 20, r * 20, 20, 20);
    }else{
            ctx2.fillStyle = "#4db6ac";
            ctx2.fillRect(ubicacionActual2.c * 20, ubicacionActual2.r * 20, 20, 20);
            ubicacionActual2.r = r;
            ubicacionActual2.c = c;
            ctx2.fillStyle = "yellow";
            ctx2.fillRect(c * 20, r * 20, 20, 20);
    }
}

function validarMovimiento(code){
    switch(code){
        case 38:
            break;
        case 40:
            break;
        case 37:
            break;
        case 39:
            break;
        default:
        event.preventDefault();
    }
}

function getl(r,c,grid){

}

function setl(r,c,grid,v){

}


