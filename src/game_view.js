const Game = require('./game.js');
const key = require('./keymaster.js');

function GameView(ctx) {
  this.ctx = ctx;
  this.game = new Game(this.ctx);
}

GameView.prototype.start = function() {
  this.bindKeyHandlers();

  setInterval(() => {
    this.game.draw(this.ctx);
    this.game.step();
  }, 20);
}

GameView.prototype.bindKeyHandlers = function() {
  let ship = this.game.ship;

  key('up', () => {
    ship.power([0, -1]);
  });
  key('down', () => {
    ship.power([0, 1]);
  });
  key('left', () => {
    ship.power([-1, 0]);
  });
  key('right', () => {
    ship.power([1, 0]);
  });
  key('space', () => {
    ship.fireBullet();
  });
}

module.exports = GameView;