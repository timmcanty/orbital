(function () {
  if(typeof Orbital === "undefined") {
    window.Orbital = {};
  }


  Util = Orbital.Util
  var Target = Orbital.Target = function(game) {
    Orbital.MovingObject.call(this, {
      pos: Orbital.Game.randomPosition(),
      vel: [0,0],
      color: "red",
      radius: 15
    }, game)
  };

  Util.inherits(Target, Orbital.MovingObject);

  Orbital.Launchpad.prototype.move = function () {}



})();
