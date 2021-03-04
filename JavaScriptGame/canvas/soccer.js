let context;

function init() {
  let canvas = document.getElementById("canvas");
  context = canvas.getContext('2d');
  paint();
}

function paint() {
  context.fillStyle = 'green';
  context.fillRect(0, 0, 600, 300);
  
  context.strokeStyle = 'white';
  context.beginPath();
  context.moveTo(300, 0);
  context.lineTo(300, 300);
  context.stroke();

  context.beginPath();
  context.rect(0, 100, 50, 100);
  context.stroke();

  context.beginPath();
  context.rect(550, 100, 50, 100);
  context.stroke();
  
  context.beginPath();
  context.arc(300, 150, 50, 0, Math.PI * 2);
  context.stroke();
  
}