class Circle{
	constructor(center,radius,color,fill_stroke) {
		this.center = center;
		this.radius = radius;
		this.color = color;
		this.oldCenter = center;
		this.fill_stroke = fill_stroke;
	}
	draw(){
		ctx.beginPath();
		ctx.arc(this.center.x,this.center.y, this.radius, 0, 2 * Math.PI);
				/* verifie si on a passer stroke lorsque l'on crée un cercle*/
		if (this.fill_stroke == "stroke"){
			ctx.strokeStyle = this.color;
			ctx.stroke();
		}
				/* verifie si on a passer fill lorsque l'on crée un cercle*/
		if (this.fill_stroke == "fill"){
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	}

	distance(m){
  		return (m.getDistance(this.center))-this.radius;
  	}

	move(m){
		this.center = new Vector(this.center.x + m.x, this.center.y + m.y)
	}
	
	intersect(p1,p2){
		//p1 = x_old p2 = x_new;
		var s = p1.sub(this.center);
		var n = new Vector(s.x,s.y);
		
		if ((p1.getDistance(this.center)-this.radius) > 0 && (p2.getDistance(this.center)-this.radius) < 0) {
			return {isIntersect : true, normal : n, position : p1}
		}
		
		else if ((p1.getDistance(this.center)-this.radius) < 0 && (p2.getDistance(this.center)-this.radius) > 0){
			return {isIntersect : true, normal : n, position : p1}
		}
		
		else { 
			return {isIntersect : false, normal : n, position : p1}
		}
	
	}
	
	oldCorrect(p){
		//var centerCircle = this.center.sub(this.oldcenter);		//calcul le déplacement du cercle
		return new Vector (p.oldPosition.x + (this.center.x - this.oldCenter.x),p.oldPosition.y + (this.center.y - this.oldCenter.y));		// crée un nouveau vecteur (déplacement)
	}
	
	update(){
		this.oldCenter = this.center;
	}
	
	reboundResolv(p,xcol){
		if ((xcol.getDistance(this.center)-this.radius) > 0 && (p.oldPosition.getDistance(this.center)-this.radius < 0) && (p.position.getDistance(this.center)-this.radius > 0)) {
			while (xcol.getDistance(this.center)-this.radius > 0) {
				if (this.center.x > xcol.x){
					xcol.x++;
				}
				if (this.center.y > xcol.y){
					xcol.y++;
				}
				if (this.center.x < xcol.x){
					xcol.x--;
				}
				if (this.center.y < xcol.y){
					xcol.y--;
				}
			}
		}
		return xcol;
	}
	
	velocity(delta){
		var oldCenterDelta = this.oldCenter.div(new Vector (delta,delta));
		var centerDelta = this.center.div(new Vector (delta,delta));
		return centerDelta.sub(oldCenterDelta);
	}
}

class Segment{
	constructor(a,b){
		this.a = a;
		this.b = b;
		this.color = "red";
		this.zone = null;
		this.olda = a;
		this.oldb = b;

	}

	draw(){
		ctx.beginPath();
		ctx.moveTo(this.a.x,this.a.y);
		ctx.lineTo(this.b.x,this.b.y);
		ctx.strokeStyle = this.color;
		ctx.stroke();
	}

	move(m){
		switch(this.zone){
			case 'a': this.a = new Vector(this.a.x + m.x, this.a.y + m.y); break;
			case 'b': this.b = new Vector(this.b.x + m.x, this.b.y + m.y); break;
			case "line" : this.a = new Vector(this.a.x + m.x, this.a.y + m.y); this.b = new Vector(this.b.x + m.x, this.b.y + m.y); break;
		}
	}

	distance(m){
		var ab = new Vector((this.a.x-this.b.x),(this.a.y-this.b.y)); 		//Distance ab
		var ba = new Vector((this.b.x-this.a.x),(this.b.y-this.a.y));		//Distance ba
		var ma = new Vector((m.x-this.a.x),(m.y-this.a.y));					//Distance ma
		var mb = new Vector((m.x-this.b.x),(m.y-this.b.y));					//Distance mb
		var am = new Vector((this.a.x-m.x),(this.a.y-m.y));					//Distance am


		if (ab.scal(ma)>0){
			this.zone= 'a';
  			return (m.getDistance(this.a));
		}
		else if (ba.scal(mb)>0){
			this.zone = 'b';
			return (m.getDistance(this.b));
		}
		else{
			var normalN = new Vector((-(ab.y)),ab.x);
			var normalizedN = Math.sqrt(Math.pow(normalN.x, 2)+Math.pow(normalN.y, 2));  //Normalisation de la norme n
			var h = (Math.abs(normalN.scal(am)))/normalizedN;
			this.zone = 'line';
			return (h);
		}
	}
	
	intersect(p1,p2){
		var dirAB = this.b.sub(this.a); 			//direction par rapport au segment ab
		var dirP1P2 = p2.sub(p1);					//direction par rapport au segment p1 p2
		var n = new Vector(-dirAB.y,dirAB.x);
		var m = new Vector(-dirP1P2.y, dirP1P2.x);
		
		// produit scalaire de la normale par rapport au segment AB
		var ap1 = p1.sub(this.a);
		ap1 = ap1.scal(n);
		var bp1 = p1.sub(this.b);
		bp1 = bp1.scal(n);
		var ap2 = p2.sub(this.a);
		ap2 = ap2.scal(n);
		var bp2 = p2.sub(this.b);
		bp2 = bp2.scal(n);
		
		// produit scalaire de la normale par rapport au segment P1P2
		var p1a = this.a.sub(p1);
		p1a = p1a.scal(m);
		var p1b = this.b.sub(p1);
		p1b = p1b.scal(m);
		var p2a = this.a.sub(p2);
		p2a = p2a.scal(m);
		var p2b = this.b.sub(p2);
		p2b = p2b.scal(m);
		
		
		
		if((ap1 > 0 && ap2 < 0 && bp1 > 0 && bp2 < 0) || (ap1 < 0 && ap2 > 0 && bp1 < 0 && bp2 > 0)) {
			if ((p1a > 0 && p1b < 0 && p2a > 0 && p2b < 0) || (p1a < 0 && p1b > 0 && p2a < 0 && p2b > 0)){
				return {isIntersect : true, normal : n, position : p1};
			}
		}
		return  {isIntersect : false, normal : n, position : p1};
	}
	
	oldCorrect(p){
		var mSeg = this.a.middle(this.b); 				//milieu de segement
		var mSegold = this.olda.middle(this.oldb); 		//milieu de l'ancien segment 
		return new Vector(p.oldPosition.x + (mSeg.x - mSegold.x), p.oldPosition.y + (mSeg.y - mSegold.y));
	}
	
	update(){
		this.olda = this.a;
		this.oldb = this.b;
	}
	
	reboundResolv(p,xcol){
		return xcol;
	}
	
	velocity(delta){
		// Calcul du centre du segment
		var mSeg = this.a.middle(this.b); 				//milieu de segement
		var mSegold = this.olda.middle(this.oldb); 
		
		
		// Divise les milieux par deltaTime
		var mSegDelta = mSeg.div(new Vector (delta,delta));
		var mSegoldDelta = mSegold.div(new Vector (delta,delta));
		
		//console.log(mSegDelta.sub(mSegoldDelta));
		return mSegDelta.sub(mSegoldDelta);
	}
}


class ObstacleManager{
	constructor(){
		this.all = [];
		this.selected = null;
	}

	draw() {
	 	this.all.forEach(obstacle => {
			obstacle.draw();
		});
	}

	select(m){
		var obsDist = null;
		this.all.forEach(obstacle => {
			if(obsDist == null){
				obsDist = obstacle.distance(m);
			}
			if (obsDist >= obstacle.distance(m)){
				obsDist = obstacle.distance(m);
				this.selected = obstacle;
			}
		});
		if (obsDist > 50){
			this.selected = null;
		}
	}
	
	update(){
		this.all.forEach(obs => {
			obs.update();
		});
	}

}
