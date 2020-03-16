// var canvas;
// var ctx;
//
// var engine;
// var mouseButton = false;
// var oldMouse = new Vector(0,0);
// var file = document.getElementById("audiofile");
// var audio = document.getElementById("audio");
// var height = window.innerHeight;
// var width = window.innerWidth;
//
// // window.addEventListener("load",mainParticuleSam);
//
// function mainParticuleSam() {
//    	canvas=document.getElementById("canvas");
// 	ctx=canvas.getContext("2d");
// 	ctx.canvas.height = height;
// 	ctx.canvas.width = width;
//
//     				//------------------------------ Générateur --------------------------------//
//     // Création de 2 générateurs
// 	engine=new Engine();
//
// 	var gen1 = new GeneratorBox();
// 	gen1.min.setXY(0,0);
// 	gen1.max.setXY(width,height);
// 	engine.particleManager.generatorList.push(gen1);
// 	engine.start();
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
