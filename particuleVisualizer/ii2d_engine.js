/**
 *
 *
 * */
 var anim;

var randInt=function(a,b) {
	return Math.floor(Math.random()*(b-a)+a);
}

var setAttributes=function(v,lAttrib) {
  for(var k in lAttrib) {
    v[k]=lAttrib[k];
  }
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

class EngineParticule {
  constructor() {
    this.particleManager = new ParticleManager();
	this.particle = new Particle();
	this.generatorBox = new GeneratorBox();
	this.obstacleManager = new ObstacleManager();
    this.time=0;
    this.deltaTime=0.05;
	this.epsilon = 0.2;
	this.music = new MusicManager(this.particleManager, null);
  }
	stopAnimation(){
		window.cancelAnimationFrame(anim);
	}
  draw() {
	/*var v = new Vector(0,0);
	var x,y;
    v.setRandInt(new Vector(100,150),new Vector(200,250));
	ctx.clearRect(0,0,500,500);
	ctx.fillRect(v.x,v.y,150,150);
	ctx.fillStyle = 'red';*/
	var hauteur = window.innerHeight;
	var largeur = window.innerWidth;
	ctx.clearRect(0,0,largeur,hauteur);

	//Pour voir le centre du generator box
	//ctx.beginPath();
	//ctx.arc(this.generatorBox.min.middle(this.generatorBox.max).x,this.generatorBox.min.middle(this.generatorBox.max).y,2,0,2*Math.PI);
	//ctx.fillStyle = "red";
	//ctx.fill();
	//console.table(this.generatorBox.min.middle(this.generatorBox.max));

	this.particleManager.draw();
	this.obstacleManager.draw();
	this.music.draw();
  }

  updateData() {
	//this.force();
	this.motion();
	this.collision();
    this.particleManager.update();
	this.obstacleManager.update();
	this.music.update();


  }

  loop() {
    this.time+=this.deltaTime;
    this.updateData();
    this.draw();
    anim = window.requestAnimationFrame(this.loop.bind(this));
  }

  start() {
    this.loop();
  }

  motion(){
	this.particleManager.all.forEach(particle => {
		var v_x_new = particle.velocity.x;  //plus tard
		var v_y_new = particle.velocity.y;

		//var v_x_new = particle.velocity.x + a_x_new * this.deltaTime;
		//var v_y_new = particle.velocity.y + a_y_new * this.deltaTime;

		var x_new = particle.position.x + particle.velocity.x * this.deltaTime;
		var y_new = particle.position.y + particle.velocity.y * this.deltaTime;
		particle.motion(x_new,y_new,v_x_new,v_y_new);
	});
  }
  collision(){
  	this.particleManager.all.forEach(particle => {
		this.obstacleManager.all.forEach(obs => {
			this.solveCollision(particle, obs);
		});
	});
  }

  solveCollision(particule, obstacle){
	var oldPosCorrec = obstacle.oldCorrect(particule);
	var resultat = obstacle.intersect(oldPosCorrec, particule.position);

	if (resultat.isIntersect){
		this.impulse(particule,resultat.normal,resultat.position,obstacle);
	}
  }

  impulse(p,ncol,pcol,obs){
  	var coefRest = this.epsilon;
	var nUnitaire = ncol.div(new Vector(ncol.normalisation(),ncol.normalisation()));

	 /*reglage de la velocité de collision */

	//p.velocity = vnew
	var vN_x = (p.velocity.scal(nUnitaire))*nUnitaire.x;
	var vN_y = (p.velocity.scal(nUnitaire))*nUnitaire.y;
	var vN_new = new Vector(vN_x,vN_y); 		//Vn New

	var vT = p.velocity.sub(vN_new); 			// Vt New

	var vncol_x = (-coefRest)*vN_new.x;
	var vncol_y = (-coefRest)*vN_new.y;
	var vncol = new Vector (vncol_x,vncol_y); 	//Vn Col

	var vtcol = vT; 							//Vt Col
	var vcol = vncol.sum(vtcol); 				//velocity corrigé

	p.velocity.x = vcol.x;
	p.velocity.y = vcol.y;

	// Réaffectation de la velocity
	p.velocity.x = vcol.x;
	p.velocity.y = vcol.y;

	p.position.x = xcol.x;
	p.position.y = xcol.y;



  }

}
