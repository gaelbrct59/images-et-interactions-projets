class Atom
{
    constructor()
    {
      this.dimension = {
        width : 5
      };
      this.position = new Vector(0,0);
      this.oldPosition = new Vector(0,0);
      this.oldVelocity = new Vector(0,0);
      this.color = "blue";
      this.alive = true;
      this.dirx = randInt(-2,3);
      this.diry = randInt(-2,3);
      this.neighbour = [];
      this.diameterSegment = 150;
      if (this.dirx == 0 && this.diry == 0){
        if(randInt(1,2) == 1){
          this.dirx = randInt(1,2);
        }else{
          this.diry = randInt(1,2);
        }
      }

    }

    init()
    {
      this.position.x = randInt(0,canvas.width);
      this.position.y = randInt(0,canvas.height);
      this.oldPosition.x = this.position.x;
      this.oldPosition.y = this.position.y;
    }

    drawSegment(a1){
      ctx.beginPath();       // Start a new path
      ctx.moveTo(a1.x, a1.y);
      ctx.lineTo(this.position.x, this.position.y);
      var x = this.distance(a1);
      if (x < 50){
        x = 50
      }
      ctx.lineWidth= this.diameterSegment/x;
      ctx.strokeStyle = "#33CCCC";
      ctx.stroke();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.dimension.width, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();



      if(this.neighbour != null){
        this.neighbour.forEach((a1, i) => {
          if (this.distance(a1.position) < this.diameterSegment){
            this.drawSegment(a1.position);

          }else{
            this.neighbour.splice(i);
          }
        });
      }

    }

    update()
    {
      // Rebondissement
      if (this.position.x <= 0 || this.position.x >= canvas.width)
      {
        this.dirx = -this.dirx;
      }
      if(this.position.y <= 0 || this.position.y >= canvas.height){
        this.diry = -this.diry;
      }
      this.position.x += this.dirx;
      this.position.y += this.diry;

    }

    distance(p)
    {
      var distance = this.position.getDistance(p);
      return distance - this.dimension.width;
    }

    motion(x,y,v_x,v_y)
    {
      this.oldPosition.x = this.position.x;
      this.oldPosition.y = this.position.y;
      this.oldVelocity.x = this.dirx;
      this.oldVelocity.y = this.diry;
      this.position.x = x;
      this.position.y = y;
      this.dirx = v_x;
      this.diry = v_y;
      // console.log(this.dirx);


    }


}

class AtomManager
{
  constructor() {
    this.atoms=[];
    this.nbAliveMax=100;
    for(var i=0;i<this.nbAliveMax;++i) {
      this.atoms.push(new Atom());
    }
  }

  init()
  {
    this.atoms.forEach(a =>
    {
      a.init();
    })
  }

  draw()
  {
    this.atoms.forEach(a =>
    {
      a.draw();
    });
  }



  update()
  {
    this.atoms.forEach(a1 =>
    {
      a1.update();

      this.atoms.forEach(a2 => {
        if (a1 != a2){
          if (!(a1.neighbour.indexOf(a2) != -1 || a2.neighbour.indexOf(a1) != -1)){
            if(a1.distance(a2.position) < a1.diameterSegment){
              a1.neighbour.push(a2);
            }
          }
        }
      });
    });
  }

}
