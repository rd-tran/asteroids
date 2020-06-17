const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js')

const constants = {
  COLOR: "lightgray",
  RADIUS: 20
};

function Asteroid(options) {
  // MovingObject(options)
  MovingObject.call(this, options);
  this.vel = Util.randomVec(Math.ceil(Math.random() * 10));
  this.color = constants.COLOR;
  this.radius = constants.RADIUS;
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObj) {
  if (otherObj instanceof Ship) {
    otherObj.relocate();
  } else {
    this.game.remove(this);
    this.game.remove(otherObj);
    return true;
  }
}

module.exports = Asteroid;