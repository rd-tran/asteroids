const Util = require('./utils')
function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fillStyle = this.color;
  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  let newPos = [this.pos[0], this.pos[1]];
  
  if (this.game.isOutOfBounds(this.pos)) {
    if (this.isWrappable) {
      [this.pos[0], this.pos[1]] = this.game.wrap(newPos);
    }
  }
}

MovingObject.prototype.isCollidedWith = function(otherObj) {
  let radiiSum = this.radius + otherObj.radius;
  let distanceBtwn = Util.dist(this.pos, otherObj.pos);

  return distanceBtwn < radiiSum - 1;
}

MovingObject.prototype.collideWith = function (otherObj) {
}

MovingObject.prototype.isWrappable = true;

module.exports = MovingObject;