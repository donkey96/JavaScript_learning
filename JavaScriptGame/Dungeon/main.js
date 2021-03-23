"use strict";

var W = 31, H = 31, GAMECLEAR = 1, GAMEOVER = 2;
var ctx, keyCode = 0, maze = [], player, aliens = [];
var timer = NaN, status = 0;

var scroller = new Scroller();
Player.prototype = scroller;
Alien.prototype = scroller;

/**
 * スクロール処理オブジェクト
 */

function Scroller() {
  this.doScroll = function () {
    if (this.dx == 0 && this.dy == 0) {
      return;
    }
    if (++this.scrollCount >= 5) {
      this.x = this.x + this.dx;
      this.y = this.y + this.dy;
      this.dx = 0;
      this.dy = 0;
      this.scrollCount = 0;
    }
  }
  this.getScrollX = function () {
    return this.x * 50 + this.dx * this.scrollCount * 10;
  }
  this.getScrollY = function () {
    return this.y * 50 + this.dy * this.scrollCount * 10;
  }
}

/**
 * 主人公オブジェクトコンストラクタ
 */
function Player(x, y) {
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.dir = 0;
  this.scrollCount = 0;

  this.update = function () {
    this.doScroll();
    if (this.scrollCount > 0) {
      return;
    }
    if (this.x == W - 2 && this.y == W - 2) {
      clearInterval(timer);
      status = GAMECLEAR;
      document.getElementById("bgm").pause();
      repaint()
    }
    this.dx = 0;
    this.dy = 0;
    var nx = 0, ny = 0;
    switch (keyCode) {
      case 37: nx = -1; ny = 0;
        this.dir = 2;
        break;
      case 38: nx = 0; ny = -1;
        this.dir = 0;
        break;
      case 39: nx = +1; ny = 0;
        this.dir = 3;
        break;
      case 40: nx = 0; ny = +1;
        this.dir = 1;
        break;
    }
    if (maze[this.y + ny][this.x + nx] == 0) {
      this.dx = nx;
      this.dy = ny;
    }
  }
  this.paint = function (gc, x, y, w, h) {
    var img = document.getElementById("hero" + this.dir);
    gc.drawImage(img, x, y, w, h);
  }
}

/**
 * 的オブジェクトコンストラクタ
 */

function Alien(x, y) {
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.dir = 0;
  this.scrollCount = 0;

  this.update = function () {
    this.doScroll();

    // 衝突判定
    var diffX = Math.abs(player.getScrollX() - this.getScrollX());
    var diffY = Math.abs(player.getScrollY() - this.getScrollY());
    if (diffX <= 40 && diffY <= 40) {
      clearInterval(timer);
      status = GAMEOVER;
      document.getElementById("bgm").pause();
      repaint();
    }

    // 次の移動先
    var gapx = player.x - this.x;
    var gapy = player.y - this.y;
    switch (random(4)) {
      case 0:
        this.dx = gapx > 0 ? 1 : -1;
        this.dir = (this.dx == 37) ? 2 : 3;
        break;
      case 1:
        this.dy = gapy > 0 ? 1 : -1;
        this.dir = (this.dy == 38) ? 0 : 1;
        break;
      default:
        this.dx = 0;
        this.dy = 0;
        break;
    }
  }
  this.paint = function (gc, w, h) {
    var img = document.getElementById("alien" + this.dir);
    gc.drawImage(img, this.getScrollX(), this.getScrollY(), w, h);
  }
}

function random(v) {
  return Math.floor(Math.random() * v);
}

function init() {
  var maze = document.getElementById("maze");
  ctx = maze.getContext('2d');
  ctx.font = "bold 48px sans-serif";
  
  createMaze(W, H);
  player = new Player(1, 1);
  aliens = [new Alien(W - 2, 1), new Alien(1, W - 2)];
  repaint();
}

function go() {
  window.onkeydown = mykeydown;
  window.onkeyup = mykeyup;

  var maze = document.getElementById("maze");
  maze.onmousedown = mymousedown;
  maze.onmouseup = mykeyup;
  maze.oncontextmenu = function (e) { e.preventDefault(); };
  maze.addEventListener("touchstart", mymousedown);
  maze.addEventListener("touchend", mykeyup);

  timer = setInterval(tick, 45);
  document.getElementById("START").style.display = "none";
  document.getElementById("bgm").play();
}

/**
 * メインルーチン
 */
function tick() {
  player.update();
  for (var i = 0; i < aliens.length; i++) {
    aliens[i].update();
  }
  repaint();
}

/**
 * 幅:w、高さ:hの迷路生成
 */
function createMaze(w, h) {
  for (var y = 0; y < H; y++) {
    maze[y] = [];
    for (var x = 0; x < W; x++) {
      maze[y][x] = (x == 0 || x == w - 1 || y == 0 || y == h - 1) ? 1 : 0;
    }
  }
  for (var y = 2; y < h - 2; y += 2) {
    for (var x = 2; x < w - 2; x += 2) {
      maze[y][x] = 1;

      // 最上段は上下左右、それ以外は下左右
      var dir = random((y == 2) ? 4 : 3);
      var px = x, py = y;
      switch (dir) {
        case 0: py++; break;
        case 1: px--; break;
        case 2: px++; break;
        case 3: py--; break;
      }
      maze[py][px] = 1;
    }
  }
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * 描画
 */
function repaint() {
  // 背景クリア
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 900, 600);

  // クリップ領域設定
  ctx.save();
  ctx.beginPath();
  ctx.arc(300, 300, 300, 0, Math.PI * 2);
  ctx.clip();

  // 迷路描画
  ctx.fillStyle = "brown";
  ctx.translate(6 * 50, 6 * 50);
  ctx.translate(-1 * player.getScrollX(), -1 * player.getScrollY());
  for (var x = 0; x < W; x++) {
    for (var y = 0; y < H; y++) {
      if (maze[y][x] == 1) {
        ctx.fillRect(x * 50, y * 50, 50, 50);
      }
    }
  }
  for (var i = 0; i < aliens.length; i++) {
    aliens[i].paint(ctx, 50, 50);
  }
  ctx.restore();

  // 地図描画
  ctx.fillStyle = "#eeeeee";
  ctx.fillRect(650, 0, 250, 600);

  ctx.save();
  ctx.translate(670, 300);
  ctx.fillStyle = "brown";
  for (var x = 0; x < W; x++) {
    for (var y = 0; y < H; y++) {
      if (maze[y][x] == 1) {
        ctx.fillRect(x * 7, y * 7, 7, 7);
      }
    }
  }
  drawCircle(player.x * 7 + 3, player.y * 7 + 3, 3, "red");
  for (var i = 0; i < aliens.length; i++) {
    drawCircle(aliens[i].x * 7 + 3, aliens[i].y * 7 + 3, 3, "purple");
  }
  ctx.restore();

  // コントローラ描画
  ctx.drawImage(arrows, 670, 70, 200, 200);
  var ax = -100, ay = -100;
  switch (keyCode) {
    case 39: ax = 830; ay = 170; break;
    case 40: ax = 770; ay = 230; break;
    case 37: ax = 710; ay = 170; break;
    case 38: ax = 770; ay = 120; break;
  }
  drawCircle(ax, ay, 30, "yellow");
  
  // 主人公の描画とメッセージ
  player.paint(ctx, 300, 300, 50, 50);
  ctx.fillStyle = "yellow";
  if (status == GAMEOVER) {
    ctx.fillText("GAME OVER", 150, 200);
  } else if (status == GAMECLEAR) {
    ctx.fillText("GAME CLEAR", 150, 200);
  }
}

// キー＆マウス押下のイベントハンドラ
function mykeydown(e) {
  keyCode = e.keyCode;
}
function mykeyup(e) {
  keyCode = 0;
}
function mymousedown(e) {
  var mouseX = !isNaN(e.offsetX) ? e.offsetX : e.touches[0].clientX;
  var mouseY = !isNaN(e.offsetY) ? e.offsetY : e.touches[0].clientY;
  if (670 < mouseX && mouseX < 870 && 70 < mouseY && mouseY < 270) {
    mouseX -= 770;
    mouseY -= 170;
    if (Math.abs(mouseX) > Math.abs(mouseY)) {
      keyCode = mouseX < 0 ? 37 : 39;
    } else {
      keyCode = mouseY < 0 ? 38 : 40;
    }
  }
}