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
  var angles = [ [-1, 1, 2], [-w, w, w + w], [-2, -1, 1], [-w - w, -w, w] ];
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
      case " ": keys.rotate = true; break;
    }
  }

  var tick = 0;

  var move = function() {
    tick++
    left0 = left;
    top0 = top;
    angle0 = angle;

    if (keys.left) {
      left--;
    }
    if (keys.right) {
      left++;
    }
    if (tick % speed == 0) {
      top++;
    }
    if (keys.rotate) {
      angle++;
    }

    keys = {};
    var parts = angles[angle % angles.length];

    for (var i = -1; i < parts.length; i++) {
      var offset = parts[i] || 0;
      if (fills[top * width + left + offset]) {
        left = left0;
        top = top0;
        angle = angle0;
        parts = parts0;
      }
    }

    for (var i = -1; i < parts0.length; i++) {
      var offset = parts0[i] || 0;
      cells[top0 * width + left0 + offset].style.backgroundColor = "";
    }

    parts0 = parts;

    for (var i = -1; i < parts0.length; i++) {
      var offset = parts0[i] || 0;
      cells[top * width + left + offset].style.backgroundColor = "red";
    }
    
    var info = tick + " (" + left + ", " + top + ")";

    document.getElementById("info").innerHTML = info;
    setTimeout(move, 1000 / speed);
  }
  move();
}

