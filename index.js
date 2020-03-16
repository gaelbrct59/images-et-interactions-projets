canvas=document.getElementById("canvas");
ctx=canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var file = document.getElementById("audiofile");
var audio = document.getElementById("audio");
var btnRabox = document.getElementById("rabox");
var btnAtom = document.getElementById("atom");
var btnParticule = document.getElementById("samuel");
var musique = null;
var eventMouseMove = false;
var eventMouseDown = false;
var engine=null;

btnRabox.addEventListener("click",mainRabox);
btnAtom.addEventListener("click",mainAtom);
btnParticule.addEventListener("click",mainParticuleSam);
window.addEventListener("load",mainAtom);

function initCanvas() {
  if(engine != null){
    engine.stopAnimation();
  }

}

function mainRabox() {
  initCanvas();
    if(eventMouseMove){
      canvas.removeEventListener('mousemove',handleMouseMove,false);
      eventMouseMove = false;
    }
    canvas.addEventListener('mousedown',handleMouseDown,false);
    eventMouseDown = true;

    engine=new Engine();
    if(musique == null){
      musique = engine.music;
    }else{
      engine.music = musique;
      engine.music.foxes = engine.foxes;
      engine.music.rabbits = engine.rabbits;

    }
    engine.start();
}



function mainParticuleSam() {
   initCanvas();
   document.getElementById("canvas").style.backgroundImage = 'url(particuleVisualizer/Background.jpg)';
   document.getElementById("canvas").style.backgroundRepeat = "no-repeat";
   document.getElementById("canvas").style.backgroundAttachment = "fixed";
   document.getElementById("canvas").style.backgroundSize="100% 100%";

   if(eventMouseMove){
     canvas.removeEventListener('mousemove',handleMouseMove,false);
     eventMouseMove = false;
   }
   if(eventMouseDown){
     canvas.removeEventListener('mousedown',handleMouseDown,false);
     eventMouseDown = false;
   }
  	engine=new EngineParticule();
    if(musique == null){
      musique = engine.music;
    }else{
      engine.music = musique;
      engine.music.foxes = engine.particleManager;
      engine.music.rabbits = null;

    }
  	var gen1 = new GeneratorBox();
  	gen1.min.setXY(0,0);
  	gen1.max.setXY(width,height);
  	engine.particleManager.generatorList.push(gen1);
    engine.music.fft = 1024;
  	engine.start();
}

function mainAtom() {
  initCanvas();

  if(eventMouseDown){
    canvas.removeEventListener('mousedown',handleMouseDown,false);
    eventMouseDown = false;
  }
    canvas.addEventListener('mousemove',handleMouseMove,false);
    eventMouseMove = true;


    engine=new EngineAtom();
    if(musique == null){
      musique = engine.music;
    }else{
      engine.music = musique;
      engine.music.foxes = engine.atom;
      engine.music.rabbits = null;
    }
    engine.start();
}
function handleMouseMove(event) {
  // get the mouse relative to canvas
  var mouseX = event.layerX-canvas.offsetLeft;
  var mouseY = event.layerY-canvas.offsetTop;
  engine.mouse.x = mouseX;
  engine.mouse.y = mouseY;
}

function handleMouseDown(event) {
  // get the mouse relative to canvas
  var mouseX = event.layerX-canvas.offsetLeft;
  var mouseY = event.layerY-canvas.offsetTop;
  var mouse=new Vector(mouseX,mouseY);
  mouseDown = true;

  engine.foxes.select(mouse);
  engine.rabbits.select(mouse)
  //console.log(engine.particleManager.selected)
  //console.log(engine.obstacleManager.obstacleList[0].distance(mouse));
  // engine.obstacleManager.select(mouse);

}


file.onchange = function()
{
  var files = this.files;
  audio.src = URL.createObjectURL(files[0]);
  engine.music.audio = audio;
  engine.music.init();
}
