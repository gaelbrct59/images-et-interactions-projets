// var width = window.innerWidth;
// var height = window.innerHeight;
//
// class MusicManagerParticule
// {
// 	constructor(particle){
//       	this.particle = particle;
// 	   	this.audio = null;
//       	this.context = null;
//       	this.src = null;
//       	this.analyser = null;
//       	this.fft = 1024;
//       	this.bufferLength = 0;
//       	this.dataArray = null;
//       	this.time = 0;
//       	this.deltaTime = 0.05;
// 	 	this.speed = 0;
// 	  	this.totalTime = 0;
//     }
//
//     init(){
// 		this.context = new AudioContext();
//       	this.audio.load();
//       	this.audio.play();
//       	this.src = this.context.createMediaElementSource(this.audio);
//       	this.analyser = this.context.createAnalyser();
//
//       	this.src.connect(this.analyser);
//       	this.analyser.connect(this.context.destination);
//
//       	this.analyser.fftSize = this.fft;
//
//       	this.bufferLength = this.analyser.frequencyBinCount;
//       	this.dataArray = new Uint8Array(this.bufferLength);
//       	this.audio.play();
// 	  	this.totalTime = Math.ceil(this.audio.duration);
// 	 }
//
//
//
//
//     update() {
// 	  	this.time += this.deltaTime;
//       	if(this.dataArray != null){
//         	this.analyser.getByteFrequencyData(this.dataArray);
// 			this.particle.all.forEach(particule =>
//         	{
// 				var new_deltaTime = this.deltaTime + (( average(this.dataArray))/200);
//
// 				var v_x_new = particule.velocity.x;
// 				var v_y_new = particule.velocity.y;
//
// 				var x_new = particule.position.x + v_x_new * new_deltaTime;
// 				var y_new = particule.position.y + v_y_new * new_deltaTime;
//
// 				particule.motion(x_new,y_new,v_x_new,v_y_new);
//
// 			})
// 		//for(var i=0; i<this.bufferLenght; i++){
//
// 		//}
//       	}
// 	}
//
//
// 	draw(){
// 	this.time += this.deltaTime;
//       	if(this.dataArray != null){
//
// 		this.analyser.getByteFrequencyData(this.dataArray);
// 		var circleRadius = canvas.height/10;
// 		var frequencyWidth = ((2*Math.PI)/this.bufferLength);
//
// 		var frequencyHeight = 0;
// 		var x = 0;
// 		for(var increment = 0; increment < this.bufferLength; increment+=4){  // ou increment+=10
//
// 			frequencyHeight = this.dataArray[increment] * (canvas.height * 0.0008);
//
// 			if(this.dataArray[increment] >0 && this.dataArray[increment] < 40){		//violet
// 				var r = 162;
// 		       	var g = 0;
// 		       	var b = 255;
// 			}
// 			if(this.dataArray[increment] >39 && this.dataArray[increment] < 80){		//indigo
// 				var r = 0;
// 		       	var g = 0;
// 		       	var b = 255;
// 			}
// 			if(this.dataArray[increment] >79 && this.dataArray[increment] < 120){		//bleu
// 				var r = 0;
// 		       	var g = 232;
// 		       	var b = 255;
// 			}
// 			if(this.dataArray[increment] >119 && this.dataArray[increment] < 160){		//vert
// 				var r = 203;
// 		       	var g = 245;
// 		       	var b = 13;
// 			}
// 			if(this.dataArray[increment] >159 && this.dataArray[increment] < 200){	// jaune
// 				var r = 255;
// 		       	var g = 243;
// 		       	var b = 0;
// 			}
// 			if(this.dataArray[increment] >199 && this.dataArray[increment] < 240){	// orange
// 				var r = 255;
// 		       	var g = 151;
// 		       	var b = 0;
// 			}
// 			if(this.dataArray[increment] >239){	// rouge
// 				var r = 255;
// 		       	var g = 19;
// 		       	var b = 0;
// 			}
//
// 			ctx.beginPath();
// 			var ax = canvas.width/2 + (circleRadius*Math.cos(x*1000));
// 			var ay = canvas.height/2 + (circleRadius*Math.sin(x*1000));
//
// 			var bx = canvas.width/2 + ((circleRadius+frequencyHeight)*Math.cos(x*1000));
// 			var by = canvas.height/2 + ((circleRadius+frequencyHeight)*Math.sin(x*1000));
//
// 			ctx.moveTo(ax,ay);
// 			ctx.lineTo(bx,by);
// 			ctx.lineWidth = 5;
// 			ctx.strokeStyle ="rgb(" + r + "," + g + "," + b + ")";
// 			ctx.stroke();
// 			//console.log("je dois dessiner");
// 			var currentTime = Math.ceil(document.getElementById('audio').currentTime);
// 			ctx.beginPath();
// 			ctx.arc(canvas.width/2, canvas.height/2, circleRadius-10, -0.5*Math.PI, -0.5*Math.PI+(((2*Math.PI)/this.totalTime)*currentTime),false);
// 			ctx.lineWidth = 10;
// 			ctx.stroke();
// 			x += (2*Math.PI)/(this.bufferLength);
// 		}
// 		}
// 	}
//
//
// }
