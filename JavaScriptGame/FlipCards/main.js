"use strict"
// 配列シャッフル
Array.prototype.shuffle = function () {
  var i = this.length;
  while (i) {
    var j = Math.floor(Math.random() * i);
    var t = this[--i];
    this[i] = this[j];
    this[j] = t;
  }
  return this;
}

// 広域変数
var timer = NaN, score = 0, flipTimer, prevCard, startTime;

// 初期化関数
function init() {
  var table = document.getElementById("table");

  var cards = [];
  for (var i = 1; i <= 13; i++) {
    cards.push(i);
    cards.push(i);
    cards.push(i);
    cards.push(i);
  }
  cards.shuffle();

  for (var i = 0; i < 4; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < 13; j++) {
      var td = document.createElement("td");
      td.className = "card back";
      td.number = cards[i * 13 + j];
      td.onclick = flip;
      tr.appendChild(td);
      td.classList.add("color" + i);
    }
    table.appendChild(tr);
  }
  startTime = new Date();
  timer = setInterval(tick, 1000);
}

// 経過時間計測用タイマー
function tick() {
  var now = new Date();
  var elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
  document.getElementById("time").textContent = elapsed;
}

// カード裏返し
function flip(e) {
  var src = e.srcElement;
  var crassColor = src.classList.value;
  console.log(e);
  if (flipTimer || src.textContent != "") {
    return;
  }
  var num = src.number;
  var a =src.className = "card color4";
  console.log(a)
  src.textContent = num;

  // 1枚目
  if (prevCard == null) {
    prevCard = src;
    return;
  }

  // 2枚目
  if (prevCard.number == num) {
    if (++score == 10) {
      clearInterval(timer);
    }
    prevCard = null;
    clearTimeout(flipTimer);
  } else {
    flipTimer = setTimeout(function () {
      src.className = crassColor;
      src.textContent = "";
      prevCard.className = crassColor;
      prevCard.textContent = "";
      prevCard = null;
      flipTimer = NaN;
    }, 1000);
  }
}