function draw() {
  var canvas = document.querySelector('#canvas');
  var context = canvas.getContext('2d');
  context.fillStyle = "rgba(255, 0, 0, 0.5)";
  context.fillRect(100, 100, 100, 100);
  context.fillStyle = "rgba(0, 0, 255, 0.5)";
  context.fillRect(50, 50, 100, 100);
}