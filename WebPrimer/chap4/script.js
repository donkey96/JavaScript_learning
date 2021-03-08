function draw() {
  var pdata1 = [
    [50, 100],
    [350, 100],
    [200, 300]
  ];
  var pdata2 = [
    [50, 250],
    [350, 250],
    [200, 50]
  ];

  var canvas = document.querySelector("#canvas");
  var context = canvas.getContext('2d');
  
  context.strokeStyle = 'black';

  context.fillStyle = 'rgba(0, 255, 0, 0.5)';
  tri(pdata1);

  context.fillStyle='rgba(0, 0, 255, 0.5)';
  tri(pdata2);

  function tri(pdata) {
    context.beginPath();
    var p = pdata[0]
    context.moveTo(p[0], p[1]);
    for (var i = 1; i < pdata.length; i++) {
      p = pdata[i];
      context.lineTo(p[0], p[1]);
    }
    context.closePath();
    context.fill();
    context.stroke();
  }
}