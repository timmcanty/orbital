(function () {
  if(typeof Orbital === "undefined") {
    window.Orbital = {};
  }

  var MovingObject = Orbital.MovingObject = function (hash, game) {
    this.game = game;
    this.pos = hash.pos;
    this.vel = hash.vel;
    this.radius = hash.radius;
    this.color = hash.color;
  };

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.draw = function (ctx) {
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

  MovingObject.prototype.move = function (mult) {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    if (this.isPullable) {
    this.getsPulled();
  }

    if (Orbital.Game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = Orbital.Util.wrap(this.pos);
      } else {
      this.game.remove(this);
      }
    }
  };

  MovingObject.prototype.getsPulled = function() {
    pullee = this;
    this.game.blackholes.forEach( function (puller) {
      var toPuller = Orbital.Util.fromToVec(pullee.pos, puller.pos);
      var dist = Orbital.Util.dist(pullee.pos,puller.pos);
      if ( dist < 300) {
      pullee.vel[0] += ((puller.weight * toPuller[0]) / Math.pow(dist,1));
      pullee.vel[1] += ((puller.weight * toPuller[1]) / Math.pow(dist,1));
      }
    });
  };




  MovingObject.prototype.isCollidedWith = function(otherObj) {
    var dx = this.pos[0] - otherObj.pos[0];
    var dy = this.pos[1] - otherObj.pos[1];
    var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (dist <= (this.radius + otherObj.radius)) {
      return true;
    } else {
      return false;
    }
  };



  MovingObject.prototype.collideWith = function(otherObject) {
    // throw "OH NO!";
  };


})();
