/*
Classe du renard
*/
class Rabbit
{
    constructor()
    {
      this.dimension = {
        width : 15 // Ici même si le renard est representé par un cercle, on dira que son rayon est sa longueur
      };
      this.position = new Vector(0,0);
      this.velocity = new Vector(0,0);
      this.alive = true;
      this.isChasing = false;
      this.lifePoints = 1000;
      this.respawnTime = 50;
      this.color = "grey";
      this.givenBonus = {
        attack : Math.random(),
        velocity : Math.random()
      };
    }

    init()
    {
      // this.dimension = {
      //   width : 15 // Ici même si le lapin est representé par un cercle, on dira que son rayon est sa longueur
      // };
      this.position.x = randInt(0,canvas.width);
      this.position.y = randInt(0,canvas.height);
      //this.velocity.x = randInt(-1,1);
      //this.velocity.y = randInt(-1,1);
      this.alive = true;
      this.isChasing = false;
      this.lifePoints = 1000;
      this.respawnTime = 50;
      // this.color = "grey";
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.dimension.width, 0, 2 * Math.PI);
      ctx.strokeStyle = "white";
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.stroke();
    }

    update()
    {
      if(this.lifePoints <= 0)
      {
        this.alive = false;
      }
      if(this.alive)
      {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        // this.velocity.x = randInt(-3,4);
        // this.velocity.y = randInt(-3,4);
      }
      else
      {
        // this.velocity.x = 0;
        // this.velocity.y = 0;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        //this.color = "red";
        if(this.dimension.width > 0.1)
        {
          this.dimension.width -= 0.20;
        }
        this.respawnTime--;
      }
      if(this.respawnTime <= 0)
      {
        this.init();
      }

    }

    distance(p)
    {
      var distance = this.position.getDistance(p);
      return distance - this.dimension.width;
    }
}

class RabbitsManager
{
  constructor() {
    this.rabbits=[];
    this.nbAliveMax=200;
    this.selected = null;
    for(var i=0;i<this.nbAliveMax;++i) {
      this.rabbits.push(new Rabbit());
    }
  }

  init()
  {
    this.rabbits.forEach(rabbit =>
    {
      rabbit.init();
    })
  }

  draw()
  {
    /*Affichage du lapin séléctionner */
    if(this.selected != null)
    {
      //this.selected.color = "green";
      ctx.font = "20px Comic Sans MS";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("Vie : "+this.selected.lifePoints+" Chassé : "+this.selected.isChasing, 800, 100);
    }

    this.rabbits.forEach(rabbit =>
    {
      rabbit.draw();
    });
  }

  update()
  {
    this.rabbits.forEach(rabbit =>
    {
      rabbit.update();
    });
  }

  select(m)
  {
    var distance_min = this.rabbits[0].distance(m);
    this.rabbits.forEach(rabbit => {
      if(distance_min >= rabbit.distance(m))
      {
        if(this.selected != null)
        {
          this.selected.color = 'grey';
        }
        this.selected = rabbit;
        distance_min = rabbit.distance(m);
      }
    });
    if(distance_min > 10)
    {
      this.selected = null;
    }
  }
}
