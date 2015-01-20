(function () {
  if(typeof Orbital === "undefined") {
    window.Orbital = {};
  }

  var GameView = Orbital.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    var game = this.game;

    setInterval( function () {
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this), 20);
  };

})();
