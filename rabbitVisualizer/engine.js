/**
 * Classe engine
 *
 * */


var randInt=function(a,b) {
	return Math.floor(Math.random()*(b-a)+a);
}

var setAttributes=function(v,lAttrib) {
  for(var k in lAttrib) {
    v[k]=lAttrib[k];
  }
}

/*Redefini une valeur par rapport à sa plage de base dans une nouvelle plage*/
var mapRange = function(x,baseRangeMin,baseRangeMax,newRangeMin,newRangeMax)
{

	return x;
}


var average = function(dataArray)
{
	var av = 0;
	for(var i = 0;i<dataArray.length;i++)
	{
		av += dataArray[i];
	}
	return av/dataArray.length;
}
class Engine {
  constructor() {
    this.time=0;
    this.deltaTime=0.1;
    this.foxes = new FoxesManager();
    this.rabbits = new RabbitsManager();
		this.music = new MusicManager(this.foxes,this.rabbits);
  }

  init()
  {
    this.foxes.init();
    this.rabbits.init();
		// navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(this.music.initMicro);
		// this.music.initMicro();
  }

  draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.strokeStyle = "black";
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,canvas.width,canvas.height)
    this.foxes.draw();
    this.rabbits.draw();
  }

  updateData() {
    this.chase();
    this.eat();
		this.music.updateFoxAndRabbit();
    this.foxes.update();
    this.rabbits.update();
  }

  loop() {
    this.time+=this.deltaTime;
    this.updateData();
    this.draw();
    window.requestAnimationFrame(this.loop.bind(this));
}

  start() {
    this.init();
    this.loop();
  }

  chase()
  {
    this.foxes.foxes.forEach(fox =>
    {
			if(fox.rabbitChasing == null)
			{
	      var rabbit_min_distance = fox.distance(this.rabbits.rabbits[0].position);
	      this.rabbits.rabbits.forEach(rabbit =>
	      {
	        if(rabbit.alive && !rabbit.isChasing && fox.distance(rabbit.position)<=rabbit_min_distance)
	        {
	          rabbit_min_distance = fox.distance(rabbit.position);
						fox.rabbitChasing = rabbit;
	        }
	      });
	      if(fox.rabbitChasing != null)
	      {
	        fox.rabbitChasing.isChasing = true;
	      }
			}
    });
  }

  eat()
  {
    this.foxes.foxes.forEach(fox =>
    {
			if(fox.rabbitChasing != null && fox.distance(fox.rabbitChasing.position) < fox.dimension.width)
      {
        fox.rabbitChasing.lifePoints -= fox.attackPoints;
      }
    });
  }
}
