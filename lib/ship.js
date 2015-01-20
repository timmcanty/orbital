(function () {
  if(typeof Orbital === "undefined") {
    window.Orbital = {};
  }

  var Ship = Orbital.Ship = function(game, hash) {
    Orbital.MovingObject.call(this, {
      pos: hash.pos,
      vel: hash.vel,
      color: "blue",
      radius: 10
    }, game)
    this.isPullable = true;
    this.isWrappable = false;
  }

  Orbital.Util.inherits(Ship, Orbital.MovingObject);

  Ship.prototype.draw = function(ctx) {

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

  Ship.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Orbital.BlackHole) {
      this.game.remove(this);
    } else if (otherObject instanceof Orbital.Launchpad){
      this.game.remove(this);
    } else if (otherObject instanceof Orbital.Ship) {
      var avgVel = Orbital.Util.avgVec(this.vel,otherObject.vel);
      var thisLen = Orbital.Util.vecLength(this.vel);
      var otherLen = Orbital.Util.vecLength(otherObject.vel);
      this.vel[0] = 2 * avgVel[0] - this.vel[0];
      this.vel[1] = 2 * avgVel[1] - this.vel[1];
      otherObject.vel[0] = 2 * avgVel[0] - this.vel[0];
      otherObject.vel[1] = 2 * avgVel[1] - this.vel[1];

      this.vel = Orbital.Util.normVec(this.vel, thisLen);
      otherObject.vel = Orbital.Util.normVec(otherObject.vel, otherLen);
      if (Orbital.Util.tooClose(this.pos,otherObject.pos, otherObject.radius + this.radius)) {
        this.move();
        otherObject.move();
      }
    } else if (otherObject instanceof Orbital.Target) {
      console.log('here')
      alert('Winner in ' + this.game.counter + ' tries!');
      this.game.reset();
    }
  };


})();
