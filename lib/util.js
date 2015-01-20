(function () {
  if(typeof Orbital === "undefined") {
    window.Orbital = {};
  }

  var Util = Orbital.Util = function() {};

  Util.inherits = function(subClass, superClass) {
    var Dummy = function () {};
    Dummy.prototype = superClass.prototype;
    subClass.prototype = new Dummy();
  };

  // length = speed
  Util.randomVec = function(length) {
    var x = (Math.random() * 2 * length) - length; // -length to length
    var y = Math.sqrt(Math.pow(length, 2) - Math.pow(x, 2));
    y = ((Math.random() < 0.5) ? y : -y);
    return [x, y];
  };

  // vec hypotenuse
  Util.vecLength = function(vec) {
    return Math.sqrt(Math.pow(vec[0], 2) + Math.pow(vec[1], 2));
  };

  // direction of vector with given length
  Util.normVec = function(vec, length) {
    var unitVec = [(vec[0] / Util.vecLength(vec)), (vec[1] / Util.vecLength(vec))];
    var normVec = [unitVec[0] * length, unitVec[1] * length];
    return normVec;
  };

  Util.dist = function(firstPos, secondPos) {
    var dx = secondPos[0] - firstPos[0];
    var dy = secondPos[1] - firstPos[1];

    var distance = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
    return distance;
  }

  Util.wrap = function(pos) {
    var wrap_pos = [null, null]
    wrap_pos[0] = ((pos[0] + Orbital.Game.DIM_X ) % Orbital.Game.DIM_X) ;
    wrap_pos[1] = ((pos[1] + Orbital.Game.DIM_Y ) % Orbital.Game.DIM_Y) ;

    return wrap_pos;
  };

  Util.tooClose = function(firstPos,secondPos,limit) {
    var dx = secondPos[0] - firstPos[0];
    var dy = secondPos[1] - firstPos[1];

    var distance = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));

    return (distance < limit);
  };

  Util.randomFloat = function (min,max) {
    var random = (min + (Math.random() * (max-min)));
    return (min + (Math.random() * (max-min)));
  };

  Util.tooClosetoAny = function(pos, arr, limit) {
    return arr.some( function (el) {
      return Util.tooClose(pos,el, limit);
    });
  };

  Util.avgVec = function(firstVec, secondVec) {
    var avgX = (firstVec[0] + secondVec[0]) / 2;
    var avgY = (firstVec[1] + secondVec[1]) / 2;

    return [avgX,avgY];
  };

  Util.fromToVec = function(from, to) {
    var fromTo = [null,null];
    fromTo[0] = to[0] - from[0];
    fromTo[1] = to[1] - from[1];
    return Util.normVec(fromTo,1);
  };




})();
