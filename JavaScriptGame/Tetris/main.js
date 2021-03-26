"use strict";

function init() {
  var width = 12, height = 21, speed = 20;
  var fills = {};
  var html = ["<table>"];

  for (var y = 0; y < height; y++) {
    html.push("<tr>");
    for (var x = 0; x < width; x++) {
      if (x == 0 || x == width - 1 || y == height - 1) {
        html.push('<td style="background-color:silver"></td>');
        fills[x + y * width] = 'silver'
      } else {
        html.push('<td></td>');
      }
    }
    html.push("</tr>");
  }

  html.push("</table>");
  document.getElementById("view").innerHTML = html.join("");

  var cells = document.getElementsByTagName("td");
  var top = 2;
  var top0 = top;
  var left = Math.floor(width / 2);
  var left0 = left;
  var w = width;
  var blocks = [
    { color: 'cyan', angles: [[-1, 1, 2], [-w, w, w + w], [-2, -1, 1], [-w - w, -w, w] ] },
    { color: 'yellow', angles: [ [-w - 1, -w, -1] ] },
    { color: 'green', angles: [ [-w, 1 - w, -1], [-w, 1, w + 1], [1, w - 1, w], [-w - 1, -1, w] ] },
    { color: 'red', angles: [ [-w - 1, -w, 1], [1 - w, 1, w], [-1, w, w + 1], [-w, -1, w - 1] ] },
    { color: 'blue', angles: [ [-w - 1, -1, 1], [-w, 1 - w, w], [-1, 1, w + 1], [-w, w - 1, w] ] },
    { color: 'orange', angles: [ [1 - w, -1, 1], [-w, w, w + 1], [-1, 1, w - 1], [-w - 1, -w, w] ] },
    { color: 'magenta', angles: [ [-w, -1, 1], [-w, 1, w], [-1, 1, w], [-w, -1, w] ] }
  ]
  var block = blocks[Math.floor(Math.random() * blocks.length)];
  var angle = 0;
  var angle0 = angle;
  var parts0 = [];
  var keys = {};

  document.onkeydown = function (e) {
    // var key = e.key;
    // console.log(key);
    switch (e.key) {
      case "ArrowLeft": keys.left = true; break;
      case "ArrowRight": keys.right = true; break;
      case "ArrowDown": keys.down = true; break;
      case " ": keys.rotate = true; break;
    }
  }

  var tick = 0;

  var move = function() {
    tick++
    left0 = left;
    top0 = top;
    angle0 = angle;

    if (tick % speed == 0) {
      top++;
    } else {
      if (keys.left) {
        left--;
      }
      if (keys.right) {
        left++;
      }
      if (keys.down) {
        top++;
      }
      if (keys.rotate) {
        angle++;
      }
    }

    keys = {};
    var parts = block.angles[angle % block.angles.length];

    for (var i = -1; i < parts.length; i++) {
      var offset = parts[i] || 0;
      if (fills[top * width + left + offset]) {
        if (tick % speed == 0) {
          for (var j = -1; j < parts0.length; j++) {
            var offset = parts0[j] || 0;
            fills[top0 * width + left0 + offset] = block.color;
          }
          block = blocks[Math.floor(Math.random() * blocks.length)];
          left0 = left = Math.floor(width / 2);
          top0 = top = 2;
          angle0 = angle = 0;
          parts0 = parts = block.angles[angle % block.angles.length];
        } else {
          left = left0;
          top = top0;
          angle = angle0;
          parts = parts0;
        }
        break;
      }
    }

    for (var i = -1; i < parts0.length; i++) {
      var offset = parts0[i] || 0;
      cells[top0 * width + left0 + offset].style.backgroundColor = "";
    }

    parts0 = parts;

    for (var i = -1; i < parts0.length; i++) {
      var offset = parts0[i] || 0;
      cells[top * width + left + offset].style.backgroundColor = block.color;
    }
    
    var info = tick + " (" + left + ", " + top + ")";

    document.getElementById("info").innerHTML = info;
    setTimeout(move, 1000 / speed);
  }
  move();
}

