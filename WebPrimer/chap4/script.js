var canvas;
var context;
var timer;
var img, bkimg;
var x = 100;
var y = 100;
var dx = 5;
var dy = 5;

// 初期化の処理
function initial() {
  canvas = document.querySelector('#canvas');
  context = canvas.getContext('2d');
  img = new Image();
  img.src = "character.png";
  bkimg = new Image();
  bkimg.src = "background.png";
  bkimg.onload = function () {
    timer = setInterval(draw, 50);
  }
}

// キーを押した時の処理
function draw(event) {
  drawBackground();
  drawImage(event);
}

// 背景の描画
function drawBackground() {
  context.clearRect(0, 0, 500, 400);
  context.drawImage(bkimg, 0, 0, 500, 400);
}

// イメージの描画
function drawImage() {
  x += dx;
  y += dy;
  if (x < 0 || x + img.width > 500) { dx *= -1; }
  if (y < 0 || y + img.height > 400) { dy *= -1; } 
  context.drawImage(img, x, y);
}