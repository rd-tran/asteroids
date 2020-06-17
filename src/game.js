const Utils = require('./utils')
const MovingObject = require("./moving_object");
const Asteroid = require("./asteroid");
const Ship = require("./ship");
const Bullet = require('./bullet')

function Game (ctx) {
  this.ctx = ctx;
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship({
    pos: this.randomPosition(),
    game: this
  });
  this.bullets = [];
}

Object.defineProperties(Game, {
  "DIM_X": {"value": 700},
  "DIM_Y": {"value": 700},
  "NUM_ASTEROIDS": {"value": 10}
});

Game.prototype.addBullet = function(bullet) {
  this.bullets.push(bullet);
}

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    let newAsteroid = new Asteroid({
      pos: this.randomPosition(),
      game: this
    });
    this.asteroids.push(newAsteroid);
  }
}

Game.prototype.allObjects = function() {
  return [...this.asteroids, this.ship, ...this.bullets];
}

Game.prototype.randomPosition = function () {
  let xPos = Math.floor(Math.random() * Game.DIM_X);
  let yPos = Math.floor(Math.random() * Game.DIM_Y);
  return [xPos, yPos];
}

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 700, 700);
  this.allObjects().forEach( obj => { obj.draw(ctx) });
}

Game.prototype.moveObjects = function() {
  this.allObjects().forEach( obj => { obj.move() });
}

Game.prototype.isOutOfBounds = function(pos) {
  let xOut = pos[0] < 0 || pos[0] > 70;
  let yOUt = pos[1] < 0 || pos[1] > 70;

  return xOut || yOUt;
}

Game.prototype.wrap = function(pos) {
  let [newXPos, newYPos] = [pos[0], pos[1]];

  if (pos[0] < 0) {
    newXPos = 700;
  } else if (pos[0] > 700) {
    newXPos = 0;
  }

  if (pos[1] < 0) {
    newYPos = 700;
  } else if (pos[1] > 700) {
    newYPos = 0;
  }

  return [newXPos, newYPos];
}

Game.prototype.checkCollisions = function checkCollisions() {
  let allObjects = this.allObjects(),
      obj1,
      obj2;

  let i = 0;
  while (i < allObjects.length) {
    obj1 = allObjects[i];

    for (let j = i + 1; j < allObjects.length; j++) {
      obj2 = allObjects[j];

      if (obj1.isCollidedWith(obj2)) {
        if (obj1.collideWith(obj2)) {
          i--;
          allObjects = this.allObjects();
          break;
        }
      }
    }
    
    i++;
  }
};

Game.prototype.step = function() {
  this.moveObjects();
  this.draw(this.ctx);
  this.checkCollisions();
}

Game.prototype.remove = function (object) {
  if (object instanceof Bullet) {
    this.bullets.splice(this.bullets.indexOf(object), 1);
  } else {
    this.asteroids.splice(this.asteroids.indexOf(object), 1);
  }
}

module.exports = Game;