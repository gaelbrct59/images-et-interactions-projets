

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


    update() {

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

          // atom.dirx = (average(this.dataArray)/10)/this.deltaTime;
          // atom.diry = (average(this.dataArray)/10)/this.deltaTime;
          // if (atom.dirx > 0){
          //   atom.dirx = (atom.dirx / average(this.dataArray));
          // }else{
          //   atom.dirx = -(atom.dirx / average(this.dataArray));
          // }
          //
          // if (atom.diry > 0){
          //   atom.diry = (atom.diry / average(this.dataArray));
          // }else{
          //   atom.diry = -(atom.diry / average(this.dataArray));
          // }
        });
      }

    }
    update()
    {

    }

    draw()
    {

    }
}
