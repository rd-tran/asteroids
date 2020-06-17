const Util = require("./utils");
const MovingObject = require("./moving_object");
const Asteroid = require('./asteroid')

const constants = {
  SCALE: 10,
  COLOR: "red",
  RADIUS: 5,
};

function Bullet(options) {
  MovingObject.call(this, options);

  let scale = Util.norm(this.vel) + constants.SCALE;
  this.vel = Util.scale(this.vel, scale);

  this.color = constants.COLOR;
  this.radius = constants.RADIUS;
}

Util.inherits(Bullet, MovingObject);

Bullet.prototype.isWrappable = false;

module.exports = Bullet;
