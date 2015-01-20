(function () {
  if(typeof Orbital === "undefined") {
    window.Orbital = {};
  }

  var BlackHole = Orbital.BlackHole = function(game) {
    Orbital.MovingObject.call(this, {
      pos: Orbital.Game.randomPosition(),
      vel: [0.0],
      color: "black",
      radius: 7 + 10 * Math.random()
    }, game)
    this.weight = .1 * this.radius * this.radius;
  }

  Orbital.Util.inherits(BlackHole, Orbital.MovingObject);

  BlackHole.prototype.draw = function(ctx) {

    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2* Math.PI,
      false
    );

    ctx.fill();
  };

  BlackHole.prototype.move = function() {};








  })();
