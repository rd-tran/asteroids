const Util = require('./utils.js');
const MovingObject = require('./moving_object');
const Asteroid = require('./asteroid.js')
const Bullet = require('./bullet');

const constants = {
  COLOR: "green",
  RADIUS: 10,
  ZEROVECTOR: [0,0]
};

function Ship (options) {
  // MovingObject(options)
  MovingObject.call(this, options);
  this.vel = constants.ZEROVECTOR;
  this.color = constants.COLOR;
  this.radius = constants.RADIUS;
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = constants.ZEROVECTOR;
}

Ship.prototype.power = function(impulse) {
  let x = this.vel[0] + impulse[0];
  let y = this.vel[1] + impulse[1];

  this.vel = [x, y];
}

Ship.prototype.fireBullet = function() {
  if (Util.norm(this.vel) === 0) {
    return;
  }

  const bullet = new Bullet({
    pos: [...this.pos],
    vel: [...this.vel],
    game: this.game
  })

  this.game.addBullet(bullet);
}

module.exports = Ship;