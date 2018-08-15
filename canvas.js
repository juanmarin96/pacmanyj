var canvas = null;
var ctx = null;

function initCanvas(){
    this.canvas = document.getElementById("campoDeJuego");
    this.ctx = canvas.getContext("2d") 
}

function pintarEscenario(){
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(200, 100);
    this.ctx.stroke();
}