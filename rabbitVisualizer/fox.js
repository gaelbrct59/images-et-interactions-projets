/*
Classe du renard
*/
class Fox
{
    constructor()
    {
      this.dimension = {
        width : 30 // Ici même si le renard est representé par un cercle, on dira que son rayon est sa longueur
      };
      this.position = new Vector(0,0);
      this.velocity = new Vector(0,0);
      this.rabbitChasing = null;
      this.alive = true;
      this.lifePoints = 1000;
      this.attackPoints = 30;
      this.rabbitKill = 0;
      this.color = 'orange';
      this.bonus = {
        velocity : 0,
        attack : 0
      }
    }

    init()
    {
      this.position.x = randInt(0,canvas.width);
      this.position.y = randInt(0,canvas.height);
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.dimension.width, 0, 2 * Math.PI);
      ctx.strokeStyle = "orange";
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.stroke();
    }

    update()
    {
      if(this.rabbitChasing != null)
      {
        if(!this.rabbitChasing.alive)
        {
          this.rabbitKill++;
          // if(this.bonus.velocity < 30)
          // {
          //   this.bonus.velocity += this.rabbitChasing.givenBonus.velocity/2;
          // }
          // if(this.bonus.attack < 500)
          // {
          //   this.bonus.attack += this.rabbitChasing.givenBonus.attack;
          // }
          //this.dimension.width += this.rabbitChasing.dimension.width/100;
          this.rabbitChasing = null;

          // this.attackPoints += this.bonus.attack;
        }
      }
      this.chase();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.attackPoints = this.bonus.attack;
    }

    distance(p)
    {
      var distance = this.position.getDistance(p);
      return distance - this.dimension.width;
    }

    chase()
    {
      if(this.rabbitChasing != null)
      {
        if(this.rabbitChasing.position.x > this.position.x)
        {
          this.velocity.x = 1+this.bonus.velocity;
        }

        if(this.rabbitChasing.position.x < this.position.x)
        {
          this.velocity.x = -1-this.bonus.velocity;
        }

        if(this.rabbitChasing.position.y > this.position.y)
        {
          this.velocity.y = 1+this.bonus.velocity;
        }

        if(this.rabbitChasing.position.y < this.position.y)
        {
          this.velocity.y = -1-this.bonus.velocity;
        }

      }
    }
}

class FoxesManager
{
  constructor() {
    this.foxes=[];
    this.nbAliveMax=10;
    this.selected = null;
    for(var i=0;i<this.nbAliveMax;++i) {
      this.foxes.push(new Fox());
    }
    this.test = 0;
  }

  init()
  {
    this.foxes.forEach(fox =>
    {
      fox.init();
    })
  }

  draw()
  {
    /*Affichage du renard séléctionner */
    if(this.selected != null)
    {
      this.selected.color = "green";
      ctx.font = "20px Comic Sans MS";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("Lapin(s) tué(s) : "+this.selected.rabbitKill, 800, 50);
      ctx.fillText("Bonus Vitesse:"+Math.floor(this.selected.bonus.velocity)+" / Attaque : "+Math.floor(this.selected.attackPoints),800,70);
      //ctx.fillText("Valeur test :"+this.test,800,100);

    }

    this.foxes.forEach(fox =>
    {
      fox.draw();
    });
  }

  update()
  {
    this.foxes.forEach(fox =>
    {
      fox.update();
    });
  }

  select(m)
  {
    var distance_min = this.foxes[0].distance(m);
    this.foxes.forEach(fox => {
      if(distance_min >= fox.distance(m))
      {
        if(this.selected != null)
        {
          this.selected.color = 'orange';
        }
        this.selected = fox;
        distance_min = fox.distance(m);
      }
    });
    if(distance_min > 10)
    {
      this.selected = null;
    }
  }
}
