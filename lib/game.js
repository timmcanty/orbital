(function () {
  if(typeof Orbital === "undefined") {
    window.Orbital = {};
  }

  var Game = Orbital.Game = function() {
    this.counter = 0;
    this.ships = [];
    this.gameTarget = new Orbital.Target(this);
    this.launchpad = new Orbital.Launchpad(this);
    this.blackholes = [];
    for (var i = 0;i < 6;i++) {
      this.blackholes.push(new Orbital.BlackHole(this));
    };
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 600;

  Game.randomPosition = function () {
    var pos = [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
    return pos;
  };

  Game.isOutOfBounds = function (pos) {
    return (pos[0] < 0 || pos[0] > Game.DIM_X) || (pos[1] < 0 || pos[1] > Game.DIM_Y);
  };

  Game.prototype.allObjects = function() {
    return this.ships.concat([this.launchpad]).concat(this.blackholes).concat([this.gameTarget]);
  };


  Game.prototype.addShip = function(pos,vel) {
    this.ships.push( new Orbital.Ship(this,{
      pos: pos,
      vel: vel
    }));
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach( function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
      this.allObjects().forEach(function (object) {
        object.move();
      });
  };



  Game.prototype.checkCollisions = function() {
    var allObjs = this.allObjects();

    for (var i = 0; i < allObjs.length - 1; i++) {
      for (var j = i+1; j < allObjs.length; j++) {
        if (allObjs[i].isCollidedWith(allObjs[j])) {
          allObjs[i].collideWith(allObjs[j]);
        }
      }
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };


  Game.prototype.remove = function(obj) {
    for (var i = 0; i < this.ships.length; i++) {
      if (this.ships[i] == obj) {
        this.ships.splice(i,1);
        return;
      }
    }
  };

  Game.prototype.reset = function (obj) {
    this.counter = 0;
    this.ships = [];
    this.gameTarget = new Orbital.Target(this);
    this.launchpad = new Orbital.Launchpad(this);
    this.blackholes = [];
    for (var i = 0;i < 6;i++) {
      this.blackholes.push(new Orbital.BlackHole(this));
    };
  };



})();
