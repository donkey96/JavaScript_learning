var canvas;
var img, bkimg;
var x = 0;
var timer;

// 初期化の処理
function initial() {
  canvas = document.querySelector('#canvas');
  canvas.onkeydown = draw;

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
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, 500, 400);
  context.drawImage(bkimg, 0, 0, 500, 400);
}

// イメージの描画
function drawImage(event) {
  var context = canvas.getContext('2d');
  x += 5;
  context.drawImage(img, x, 230);
  if (x > 400) {
    clearInterval(timer);
  }
}