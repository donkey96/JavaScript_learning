"use strict";

function init() {
  var width = 10, height = 20;
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

  var move = function() {
    cells[top0 * width + 0].style.backgroundColor = "";
    cells[top0 * width + 1].style.backgroundColor = "";
    cells[top0 * width + 2].style.backgroundColor = "";
    cells[top0 * width + 3].style.backgroundColor = "";
    cells[top * width + 0].style.backgroundColor = "red";
    cells[top * width + 1].style.backgroundColor = "red";
    cells[top * width + 2].style.backgroundColor = "red";
    cells[top * width + 3].style.backgroundColor = "red";
    
    top0 = top;
    top++
    if (top < height) {
      setTimeout(move, 1000);
    }
  }
  move();
}

