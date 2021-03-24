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
  var top = 0;
  var top0 = top;
  var left = 0;
  var left0 = left;
  var keys = {};

  document.onkeydown = function (e) {
    switch (e.key) {
      case "ArrowLeft": keys.left = true; break;
      case "ArrowRight": keys.right = true; break;
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
    keys = {};
    cells[top0 * width + left0 + 0].style.backgroundColor = "";
    cells[top0 * width + left0 + 1].style.backgroundColor = "";
    cells[top0 * width + left0 + 2].style.backgroundColor = "";
    cells[top0 * width + left0 + 3].style.backgroundColor = "";
    cells[top * width + left + 0].style.backgroundColor = "red";
    cells[top * width + left + 1].style.backgroundColor = "red";
    cells[top * width + left + 2].style.backgroundColor = "red";
    cells[top * width + left + 3].style.backgroundColor = "red";
    
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

