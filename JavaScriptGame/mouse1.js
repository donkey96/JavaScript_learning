let context;
let points = [];

function init() {
  let canvas = document.getElementById("canvas");
  let button = document.getElementById("button");
  context = canvas.getContext('2d');
  context.strokeStyle='#FF0000';
  // イベントの設定
  canvas.addEventListener("mousedown", function (e) {
    points.push({ x: e.offsetX, y: e.offsetY });
  })
  canvas.addEventListener("mousemove", function (e) {
    if (points.length > 0) {
      points.push({ x: e.offsetX, y: e.offsetY });
    }
    paint();
  })
  canvas.addEventListener("mouseup", function () {
    points = [];
  })
  button.addEventListener("click", function () {
    context.clearRect(0, 0, 500, 500); 
  })
}

function paint() {
  // context.clearRect(0, 0, 500, 500);
  if (points.length <= 1) {
    return;
  }
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  for (let i = 0; i < points.length; i++) {
    context.lineTo(points[i].x, points[i].y);
  }
  context.stroke();
}