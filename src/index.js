const MovingObject = require("./moving_object");
const Asteroid = require("./asteroid.js");
const GameView = require("./game_view.js");

window.MovingObject = MovingObject;
window.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('game-canvas');
  canvas.height = 700;
  canvas.width = 700;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 700, 700);
  
  const gameView = new GameView(ctx);
  gameView.start();
});

