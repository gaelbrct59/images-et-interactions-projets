// var canvas;
// var ctx; // !!! context 2D (drawing)
// var engine;
// var file = document.getElementById("audiofile");
// var audio = document.getElementById("audio");
//
//
//
// window.addEventListener("load",main);
//
// function main() {
//    	canvas=document.getElementById("canvas");
//   	ctx=canvas.getContext("2d");
//     canvas.addEventListener('mousemove',handleMouseMove,false);
//     ctx.canvas.width  = window.innerWidth;
//     ctx.canvas.height = window.innerHeight;
//     // canvas.addEventListener('mousedown',handleMouseDown,false);
//     engine=new EngineAtom();
//     // engine.foxes.test = Math.random();
//     engine.start();
// }
//
//
// file.onchange = function()
// {
//   var files = this.files;
//   audio.src = URL.createObjectURL(files[0]);
//   engine.music.audio = audio;
//   engine.music.init();
// }
//
// function handleMouseMove(event) {
//   // get the mouse relative to canvas
//   var mouseX = event.layerX-canvas.offsetLeft;
//   var mouseY = event.layerY-canvas.offsetTop;
//   // mouse.width = 0.1;
//   // mouse.position.x = mouseX;
//   // mouse.position.y = mouseY;
//   // mouse.dirx = 0;
//   // mouse.diry = 0;
//   // engine.atom.atoms.push(mouse);
//
//   engine.mouse.x = mouseX;
//   engine.mouse.y = mouseY;
// }
