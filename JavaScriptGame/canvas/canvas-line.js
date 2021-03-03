let context;

function init() {
  let canvas = document.getElementById("canvas");
  context = canvas.getContext('2d');

  // コンテキストの追加
  context.strokeStyle='FF0000';
  context.fillStyle='#00FF00';
  drawTriangle(100, 10, false,false);
  drawTriangle(200, 10, true, false);
  drawTriangle(300, 10, false, true);
  drawTriangle(400, 10, true, true);
}

function drawTriangle(x, y, isClose, isFill) {
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + 80, y);
  context.lineTo(x + 80, y + 80);
  if (isClose) {
    context.closePath();
  }
  if (isFill) {
    context.fill();
  } else {
    context.stroke();
  }
}