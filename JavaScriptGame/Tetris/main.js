"use strict";

function init() {
  var width = 10, height = 20, speed = 20;
  var html = ["<table>"];

  for (var y = 0; y < height; y++) {
    html.push("<tr>");
    for (var x = 0; x < width; x++) {
      html.push('<td></td>');
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
    if (keys.left && left >0) {
      left--;
    }
    if (keys.right && left + 4 < width) {
      left++;
    }
    if (keys.rotate) {
      angle++;
    }
    keys = {};
    for (var i = -1; i < parts0.length; i++) {
      var offset = parts0[i] || 0;
      cells[top0 * width + left0 + offset].style.backgroundColor = "";
    }
    parts0 = angles[angle % angles.length];
    for (var i = -1; i < parts0.length; i++) {
      var offset = parts0[i] || 0;
      cells[top * width + left + offset].style.backgroundColor = "red";
    }
    
    top0 = top;
    if (tick % speed == 0) {
     top++; 
    }
    var info = tick + " (" + left + ", " + top + ")";
    document.getElementById("info").innerHTML = info;
    if (top < height) {
      setTimeout(move, 1000 / speed);
    }
  }
  move();
}

