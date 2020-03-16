
var width = window.innerWidth;
var height = window.innerHeight;
class MusicManager
{
    constructor(foxes,rabbits)
    {
      this.foxes = foxes;
      this.rabbits = rabbits;
      this.audio = null;
      this.context = null;
      this.src = null;
      this.analyser = null;
      this.fft = 2048;
      this.bufferLength = 0;
      this.dataArray = null;
      this.time = 0;
      this.deltaTime = 0.1;
      this.processor = null;
      this.speed = 0;
  	  this.totalTime = 0;
    }

    init()
    {
      this.context = new AudioContext();
      this.audio.load();
      this.audio.play();
      this.src = this.context.createMediaElementSource(this.audio);
      this.analyser = this.context.createAnalyser();

      this.src.connect(this.analyser);
      this.analyser.connect(this.context.destination);

      this.analyser.fftSize = this.fft;

      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);
      this.audio.play();
      this.totalTime = Math.ceil(this.audio.duration);
    }

    initMicro()
    {
      this.context = new AudioContext();
      this.src = this.context.createMediaStreamSource(stream);
      this.analyser = this.context.createAnalyser();

      this.analyser.fftSize = this.fftSize;
      this.src.connect(this.analyser);

      this.bufferLength = analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);

      // this.processor = this.context.createScriptProcessor(1024, 1, 1);
      // this.src.connect(this.processor);


      // this.processor.connect(this.context.destination);
      // processor.onaudioprocess = function(e) {
      //    // Do something with the data, e.g. convert it to WAV
      //    console.log(e.inputBuffer);
      //  };
    }

//update de Samuel
    update() {
      this.time += this.deltaTime;
      	if(this.dataArray != null){
        	this.analyser.getByteFrequencyData(this.dataArray);
			this.foxes.all.forEach(particule =>
        	{
				var new_deltaTime = this.deltaTime + (( average(this.dataArray))/200);

				var v_x_new = particule.velocity.x;
				var v_y_new = particule.velocity.y;

				var x_new = particule.position.x + v_x_new * new_deltaTime;
				var y_new = particule.position.y + v_y_new * new_deltaTime;

				particule.motion(x_new,y_new,v_x_new,v_y_new);

			})
      	}

    }
    updateFoxAndRabbit()
    {
        this.time += this.deltaTime;
        if(this.dataArray != null)
        {
          this.analyser.getByteFrequencyData(this.dataArray);
          var i = 0;
          this.rabbits.rabbits.forEach(rabbit =>
          {
            if(i >= this.bufferLength)
            {
              i = 0;
            }
            rabbit.dimension.width = this.dataArray[i]/10;
            // rabbit.color = "rgb("+this.dataArray[i]+","+this.dataArray[i]+","+this.dataArray[i]+")";
            rabbit.color = "rgb("+Math.abs(this.dataArray[i]-255)+","+Math.abs(this.dataArray[i]-255)+","+Math.abs(this.dataArray[i]-255)+")";
            if(!rabbit.alive){
              rabbit.color = "#FFF";
            }
            // rabbit.velocity.x = randInt((-average(this.dataArray)/10)+1,average(this.dataArray)/10);
            // rabbit.velocity.y = randInt((-average(this.dataArray)/10)+1,average(this.dataArray)/10);
            // rabbit.color = "rgb("+(this.dataArray[i]%255)+","+(this.dataArray[i]%255)+","+(this.dataArray[i]%255)+")";
            if(rabbit.dimension.width < 5)
            {
              rabbit.dimension.width = 5
            }
            i++;
          })

          this.foxes.foxes.forEach(fox =>
          {
            fox.bonus.velocity = average(this.dataArray)/10;
            fox.bonus.attack = average(this.dataArray)/1;
          })
        }
    }
    updateAtom(){
      this.time += this.deltaTime;
      if(this.dataArray != null)
      {
        this.analyser.getByteFrequencyData(this.dataArray);
        this.foxes.atoms.forEach(atom => {

          var new_deltaTime = this.deltaTime + ((average(this.dataArray)+1)/30)
          var v_x_new = atom.dirx;
          var v_y_new = atom.diry;

          var xnew = atom.position.x + v_x_new * new_deltaTime;
          var ynew = atom.position.y + v_y_new * new_deltaTime;

          atom.motion(xnew, ynew, v_x_new, v_y_new);

        });
      }

    }
    // Draw de Samuel
    draw()
    {

      this.time += this.deltaTime;
          	if(this.dataArray != null){

    			this.analyser.getByteFrequencyData(this.dataArray);
    			var circleRadius = canvas.height/10;
    			var frequencyWidth = ((2*Math.PI)/this.bufferLength);

    			var frequencyHeight = 0;
    			var x = 0;
    			for(var increment = 0; increment < this.bufferLength; increment+=4){  // ou increment+=10

	    			frequencyHeight = this.dataArray[increment] * (canvas.height * 0.0008);
	
	    			if(this.dataArray[increment] >0 && this.dataArray[increment] < 40){		//violet
	    				var r = 162;
	    		       	var g = 0;
	    		       	var b = 255;
	    			}
	    			if(this.dataArray[increment] >39 && this.dataArray[increment] < 80){	//indigo
	    				var r = 0;
	    		       	var g = 0;
	    		       	var b = 255;
	    			}
	    			if(this.dataArray[increment] >79 && this.dataArray[increment] < 120){	//bleu
	    				var r = 0;
	    		       	var g = 232;
	    		       	var b = 255;
	    			}
	    			if(this.dataArray[increment] >119 && this.dataArray[increment] < 160){	//vert
	    				var r = 203;
	    		       	var g = 245;
	    		       	var b = 13;
	    			}
	    			if(this.dataArray[increment] >159 && this.dataArray[increment] < 200){	// jaune
	    				var r = 255;
	    		       	var g = 243;
	    		       	var b = 0;
	    			}
	    			if(this.dataArray[increment] >199 && this.dataArray[increment] < 240){	// orange
	    				var r = 255;
	    		       	var g = 151;
	    		       	var b = 0;
	    			}
	    			if(this.dataArray[increment] >239){	// rouge
	    				var r = 255;
	    		       	var g = 19;
	    		       	var b = 0;
	    			}
	
	    			ctx.beginPath();
	    			var ax = canvas.width/2 + (circleRadius*Math.cos(x*1000));
	    			var ay = canvas.height/2 + (circleRadius*Math.sin(x*1000));
	
	    			var bx = canvas.width/2 + ((circleRadius+frequencyHeight)*Math.cos(x*1000));
	    			var by = canvas.height/2 + ((circleRadius+frequencyHeight)*Math.sin(x*1000));
	
	    			ctx.moveTo(ax,ay);
	    			ctx.lineTo(bx,by);
	    			//ctx.lineWidth = 5; 
	    			ctx.strokeStyle ="rgb(" + r + "," + g + "," + b + ")";
	    			ctx.stroke();
	    			
	    			var currentTime = Math.ceil(document.getElementById('audio').currentTime);
	    			ctx.beginPath();
	    			ctx.arc(canvas.width/2, canvas.height/2, circleRadius-10, -0.5*Math.PI, -0.5*Math.PI+(((2*Math.PI)/this.totalTime)*currentTime),false);
	    			// ctx.lineWidth = 10;
	    			ctx.stroke();
	
	    			x += (2*Math.PI)/(this.bufferLength);
    			}
    		}
    }
}
