function draw() {
  var canvas = document.querySelector('#canvas');
  var context = canvas.getContext('2d');
  context.fillStyle = "rgb(255, 0, 0)";
  context.fillRect(50, 50, 100, 100);
  context.strokeStyle = "black";
  context.strokeRect(100, 100, 100, 100);
  context.strokeRect(50, 50, 100, 100);
}