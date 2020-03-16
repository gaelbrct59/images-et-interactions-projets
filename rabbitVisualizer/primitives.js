/**
 *
 * Vector
 *
 *  */
class Vector {
  constructor(x,y) {
    this.x=x;
    this.y=y;
  }

  setRandInt(p1,p2)
  {
    this.x = randInt(p1.x,p2.x);
    this.y = randInt(p1.y,p2.y);
  }

  setXY(x,y)
  {
    this.x = x;
    this.y = y;
  }

  getDistance(p1)
  {
    return Math.sqrt((Math.pow(p1.x - this.x,2)+(Math.pow(p1.y - this.y,2))));
  }

  sum(p1)
  {
    return new Vector(this.x+p1.x,this.y+p1.y);
  }

  sub(p1)
  {
    return new Vector(this.x-p1.x,this.y-p1.y);
  }

  middle(p1){						//Calcul le milieu d'un segement
   return new Vector((this.x+p1.x)/2,(this.y+p1.y)/2);
 }

 centerRect(){
   return new Vector(this.min.middle(this.max));
 }

};
