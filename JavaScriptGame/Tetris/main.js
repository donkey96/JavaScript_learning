"use strict";

function init() {
  var html = ["<table>"];
  for (var y = 0; y < 20; y++) {
    html.push("<tr>");
    for (var x = 0; x < 10; x++) {
      html.push('<td></td>');
    }
    html.push("</tr>");
  }
  html.push("</table>");
  document.getElementById("view").innerHTML = html.join("");
}