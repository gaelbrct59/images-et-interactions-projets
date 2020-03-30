class GeneratorBox {
  constructor() {
    this.nbBirth=500;
    this.birthRate= 10; // Remplacer ICI, si l'image est ralentie : this.birthRate = 5
	this.min = new Vector(50,50);
	this.max = new Vector(150,150);
	this.longevite = 300;
	this.particleManager = new ParticleManager();
	ctx.beginPath();
}

  move(m){
	  this.min.setXY(this.min.x+m.x,this.min.y+m.y);
	  this.max.setXY(this.max.x+m.x,this.max.y+m.y);
  }

  distance(m){
  	return m.getDistance(this.min);
  }
  initParticle(p) {

	p.position.setRandInt(this.min,this.max);
	p.color.r = randInt(0,255);
	p.color.g = randInt(0,255);
	p.color.b = randInt(0,255);
	p.lifeTime = this.longevite;
	p.taille = randInt(0.5,3);

	var middle = this.min.middle(this.max);
	if (p.position.x < middle.x && p.position.y < middle.y){

		if (p.velocity.x > 0)
			p.velocity.x = p.velocity.x * -1
		if (p.velocity.y > 0)
			p.velocity.y = p.velocity.y * -1
	}
	if (p.position.x > middle.x && p.position.y < middle.y){
		if (p.velocity.x < 0)
			p.velocity.x = p.velocity.x * -1
		if (p.velocity.y > 0)
			p.velocity.y = p.velocity.y * -1
	}
	if (p.position.x > middle.x && p.position.y > middle.y){
		if (p.velocity.x < 0)
			p.velocity.x = p.velocity.x * -1
		if (p.velocity.y < 0)
			p.velocity.y = p.velocity.y * -1
	}

	if (p.position.x < middle.x && p.position.y > middle.y){
		if (p.velocity.x > 0)
			p.velocity.x = p.velocity.x * -1
		if (p.velocity.y < 0)
			p.velocity.y = p.velocity.y *-1
	}

	if(p.position.x == middle.x){
		if ((p.velocity.y > 0 && p.position.y < middle.y) || (p.velocity.y < 0 && p.position.y > middle.y))
			p.position.y = p.velocity.y *- 1
	}
	if(p.position.y == middle.y){
		if ((p.velocity.x > 0 && p.position.x < middle.x) || (p.velocity.x < 0 && p.position.x > middle.x))
			p.position.x = p.velocity.x *- 1
	}


  }
};

class Particle {
  constructor() {
    this.position = new Vector(150,150);
	this.color = {r:0,g:0,b:0,a:1};
	this.isAlive = false;
	this.lifeTime;
	this.velocity = new Vector(10,10); 
	this.oldPosition = new Vector(0,0);
	this.oldVelocity = new Vector(0,0);
	this.taille;

  }

  draw() {
	ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.taille, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba('+ this.color.r +','+ this.color.g +','+ this.color.b +','+ this.color.a +')';
      ctx.fill();

  }
  motion(x,y,v_x,v_y){

	this.position.x = x;
	this.position.y = y;

	this.velocity.x = v_x;
	this.velocity.y = v_y;
  }
}

class ParticleManager {
  constructor() {

	this.generatorList =[];
    this.all=[];
    this.nbAliveMax=10000;
	this.selected = null;

    for(var i=0;i<this.nbAliveMax;++i) {
		var p = new Particle();
		this.all.push(p);
    	}
  	}


  select(m) {
	  var genDist = null;
  	 this.generatorList.forEach(generator =>
	  {
		 if (genDist == null)
		 	genDist = generator.distance(m);
		 if (genDist >= generator.distance(m)){
			genDist = generator.distance(m);

			this.selected = generator;
		 }
	  });
	  if (genDist > 50)
		 this.selected = null;

  }

  update() {

	  //On incremente tout les nbBirth de chaque generator par le birthRate correspondant
	  this.generatorList.forEach(generator => {
		  generator.nbBirth += generator.birthRate;
	  });

	  this.all.forEach(particle =>
	  {
	  	if(particle.isAlive) 												// Si la particule est en vie alors
		{
			//var alpha = particle.alpha/particle.lifeTime;
			particle.lifeTime --; 											// on décrémente de 1 son temps de vie
			particle.color.a = particle.color.a - (1/particle.lifeTime);
			if (particle.lifeTime <= 0){									//si son temps de vie est égale à 0 (morte) alors
				particle.isAlive = false; 									//On met la particule à false.
				particle.color.a = 1;
			}
		}
		else
		{
			var find = false; 								//Variable pour savoir si la particule à trouver un generator où naitre
			this.generatorList.forEach(generator =>
			{
				if(generator.nbBirth > 0 && !find) 			//Naissance a faire et generateur ou apparaitre pas encore trouver
				{
					particle.isAlive = true;
					generator.initParticle(particle);
					generator.nbBirth--;
					find = true; 							//La particule a trouvé un generateur ou apparaitre (donc on ne repassera pas dans ce if)

				}
			});
		}
	  });
  }



  draw() {
	 this.all.forEach(particle => {
		if (particle.isAlive)
			particle.draw();
	 });
  }
};
