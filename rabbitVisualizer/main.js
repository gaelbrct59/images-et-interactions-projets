//
// var canvas;
// var ctx; // !!! context 2D (drawing)
// var engine;
// var file = document.getElementById("audiofile");
// var audio = document.getElementById("audio");
//
// window.addEventListener("load",main);
//
// function main() {
//    	canvas=document.getElementById("canvas");
//   	ctx=canvas.getContext("2d");
//     ctx.canvas.width  = window.innerWidth;
//     ctx.canvas.height = window.innerHeight;
//     canvas.addEventListener('mousedown',handleMouseDown,false);
//
//     engine=new Engine();
//     engine.foxes.test = Math.random();
//     engine.start();
// }
//
//
// function handleMouseDown(event) {
//   // get the mouse relative to canvas
//   var mouseX = event.layerX-canvas.offsetLeft;
//   var mouseY = event.layerY-canvas.offsetTop;
//   var mouse=new Vector(mouseX,mouseY);
//   mouseDown = true;
//
//   engine.foxes.select(mouse);
//   engine.rabbits.select(mouse)
//   //console.log(engine.particleManager.selected)
//   //console.log(engine.obstacleManager.obstacleList[0].distance(mouse));
//   // engine.obstacleManager.select(mouse);
//
// }
//
// file.onchange = function()
// {
//   var files = this.files;
//   audio.src = URL.createObjectURL(files[0]);
//   engine.music.audio = audio;
//   // engine.music.initMicro();
//   engine.music.init();
// }
