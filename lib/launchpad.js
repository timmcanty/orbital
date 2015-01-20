(function () {
  if(typeof Orbital === "undefined") {
    window.Orbital = {};
  }
  Util = Orbital.Util
  var Launchpad = Orbital.Launchpad = function(game) {
    Orbital.MovingObject.call(this, {
      pos: Orbital.Game.randomPosition(),
      vel: [0,0],
      color: "green",
      radius: 20
    }, game)
  };

  Util.inherits(Launchpad, Orbital.MovingObject);

  Orbital.Launchpad.prototype.move = function () {}

  Orbital.Launchpad.prototype.launchShip = function (x,y) {

    dist = Util.dist([x,y],this.pos);
    dir = Util.fromToVec(this.pos, [x,y]);
    pos = [this.pos[0] + Util.normVec(dir,31)[0], this.pos[1] + Util.normVec(dir,31)[1]]
    vel = [Util.normVec(dir,dist/40)[0], Util.normVec(dir,dist/40)[1]]
    this.game.addShip(pos,vel);
    this.game.counter++;
  }







})();
