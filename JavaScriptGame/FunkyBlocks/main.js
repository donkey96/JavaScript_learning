"use strict";

let ctx, tiles = [], moves = [], mIndex = 0, mCount = 0, times = [];
let timer = NaN, startTime = NaN, elapsed = 0, score = 0, bgimage, sound;
let mouseX = null, mouseY = null, mouseUpX = null, mouseUpY = null;
let message = ["", "good", "very good", "super", "wonderful!", "great!!",
               "amazing", "brilliant!", "excellent!!"];

function rand(v) {
  return Math.floor(Math.random() * v);
}

function iterate(f) {
  for (let x = 0; x < 12; x++) {
    for (let y = 0; y < 12; y++) {
      f(x, y, tiles[x][y]);
    }
  }
}

// タイルオブジェクト

function Tile(x, y) {
  this.x = x;
  this.y = y;
  this.px = x;
  this.py = y;
  this.count = 0;
  this.getX = function () {
    return this.x + (this.px - this.x) * (this.count) / 20;
  }
  this.getY = function () {
    return this.y + (this.py - this.y) * (this.count) / 20;
  }
  this.move = function (px, py, color) {
    this.px = px;
    this.py = py;
    this.color = color;
    this.count = 20;
    this.moving = true;
    moves.push(this);
  }
  this.update = function () {
    if (--this.count <= 0) {
      this.moving = false;
    }
  }
}

function init() {
  // タイルオブジェクトの生成
  for (let x = 0; x < 12; x++) {
    tiles[x] = [];
    for (let y = 0; y < 12; y++) {
      tiles[x][y] = new Tile(x, y);
    }
  }

  // 3つ連続しないよう初期色の配置
  iterate(function (x, y, t) {
    while (true) {
      let r = rand(5);
      if (setColor(x, y, r)) {
        t.color = r;
        break;
      }
    }
  });

  // 残り時間初期化
  for (let i = 0; i < 15; i++) {
    let t = document.createElement("img");
    t.src = "time" + i + ".png";
    times.push(t);
  }

  // Canvas初期化
  bgimage = document.getElementById("bgimage");
  let canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');
  ctx.textAlign = "center";

  sound = document.getElementById("sound");
  repaint();
}

function go() {
 let canvas = document.getElementById("canvas");
 canvas.onmousedown = mymousedown;
 canvas.onmouseup = mymouseup;
 canvas.addEventListener("touchstart", mymousedown);
 canvas.addEventListener("touchmove", mymousemove);
 canvas.addEventListener("touchend", mymouseup);

 startTime = new Date();
 timer = setInterval(tick, 25);

 document.body.addEventListener("touchmove", function (event) {
   event.preventDefault();
 }, false);
 document.getElementById("START").style.display = "none";
 document.getElementById("bgm").play();
}

// メインループ

function tick() {
  // メッセージフェードアウト効果
  mCount = Math.max(0, mCount - 1);
  if (mCount == 0) {
    mIndex = 0;
  }

  if (moves.length > 0) {
    for (let  i = 0; i < moves.length; i++) { // タイル移動
      moves[i].update();
    }
    moves = moves.filter(function (t) { return t.count != 0 });
    if (moves.length == 0) { // 移動完了
      let s = removeTile(); // タイル消去
      if (s > 0) {
        // 初回　or 連鎖
        mIndex = Math.min(message.length - 1, mIndex + 1);
        mCount = 50;
        score += s * 10 + mIndex * s * 100;
        sound.pause();
        sound.currentTime = 0;
        sound.play();
      }
      fall();
    }
  }

  elapsed = ((new Date()).getTime() - startTime) / 1000;
  if (elapsed > 69) {
    clearInterval(timer);
    timer = NaN;
  }
  repaint();
}

function setColor(x, y, c) {
  let flag = true;
  if (1 < x) {  // 左
    let c0 = tiles[x - 2][y].color;
    let c1 = tiles[x - 1][y].color;
    flag &= !(c0 == c1 && c1 == c);
  }
  if (x < 8) {  // 右
    let c0 = tiles[x + 2][y].color;
    let c1 = tiles[x + 1][y].color;
    flag &= !(c0 == c1 && c1 == c);
  }
  if (1 < y) {  // 上
    let c0 = tiles[x][y - 2].color;
    let c1 = tiles[x][y - 1].color;
    flag &= !(c0 == c1 && c1 == c);
  }
  if (y < 8) {  // 下
    let c0 = tiles[x][y + 2].color;
    let c1 = tiles[x][y + 1].color;
    flag &= !(c0 == c1 && c1 == c);
  }
  return flag;
}

function mymousedown(e) {
  mouseX = !isNaN(e.offsetX) ? e.offsetX : e.touches[0].clientX;
  mouseY = !isNaN(e.offsetY) ? e.offsetY : e.touches[0].clientY;
}

function mymousemove(e) {
  mouseUpX = !isNaN(e.offsetX) ? e.offsetX : e.touches[0].clientX;
  mouseUpY = !isNaN(e.offsetY) ? e.offsetY : e.touches[0].clientY;
}

function mymouseup(e) {
  let sx = Math.floor((mouseX - 34) / 44);
  let sy = Math.floor((mouseY - 36) / 44);
  let nx = sx, ny = sy;
  let mx = !isNaN(e.offsetX) ? e.offsetX : mouseUpX;
  let my = !isNaN(e.offsetY) ? e.offsetY : mouseUpY;
  if (Math.abs(mx - mouseX) > Math.abs(my - mouseY)) {
    nx += (mx - mouseX > 0) ? 1 : -1;
  } else {
    ny += (my - mouseY > 0) ? 1 : -1;
  }
  if (nx > 11 || ny > 11 || nx < 0 || ny < 0 ||
      tiles[sx][sy].moving || tiles[nx][ny].moving) {
    return;
  }

  let c = tiles[sx][sy].color;
  tiles[sx][sy].move(nx, ny, tiles[nx][ny].color);
  tiles[nx][ny].move(sx, sy, c);
  repaint();
}

function removeTile() {
  // 縦横３つ以上連続するタイルにremoveフラグをセット

  for (let y = 0;  y < 12; y++) { // 横方向
    let c0 =  tiles[0][y].color;
    let count = 1;
    for (let x = 1; x < 12; x++) {
      let c1 = tiles[x][y].color;
      if (c0 != c1) {
        c0 = c1;
        count = 1;
      } else {
        if (++count >= 3) {
          tiles[x - 2][y].remove = true;
          tiles[x - 1][y].remove = true;
          tiles[x - 0][y].remove = true;
        }
      }
    }
  }

  for (let x = 0; x < 12; x++) { // 縦方向
    let c0 = tiles[x][x].color;
    let count = 1;
    for (let y = 1; y < 12; y++) {
      let c1 = tiles[x][y].color;
      if (c0 != c1) {
        c0 = c1;
        count = 1;
      } else {
        if (++count >= 3) {
          tiles[x][y - 2].remove = true;
          tiles[x][y - 1].remove = true;
          tiles[x][y - 0].remove = true;
        }
      }
    }
  }
  let score = 0;
  iterate(function (x, y, t) { if (t.remove) { score++ } });
  return score;
}

function fall() { // 落下処理
  for (let x = 0; x < 12; x++) {
    for (let y = 11, sp = 11; y >= 0; y--, sp--) {
      while (sp >= 0) {
        if (tiles[x][sp].remove) {
          sp--;
        } else {
          break;
        }
      }
      if (y != sp) {
        let c = (sp >= 0) ? tiles[x][sp].color : rand(5);
        tiles[x][y].move(x, sp, c);
      }
    }
  }
  iterate(function (x, y, t) { t.remove = false; })
}

function repaint() {
  ctx.drawImage(bgimage, 0, 0);

  // タイル
  let images = [block0, block1, block2, block3, block4];
  iterate(function (x, y, t) {
    if (!t.remove) {
      ctx.drawImage(images[t.color], t.getX() * 44 + 34, t.getY() * 44 + 36, 42, 42);
    }
  });

  // メッセージ
  ctx.font = "bold 80px sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, " + (mCount / 50) + ")";
  ctx.fillText(message[mIndex], 300, 300);
  ctx. fillStyle = "white";

  if (isNaN(timer)) {
    ctx.fillText("FINISH", 350, 300);
  }

  // スコア
  ctx.fillStyle = "rgba(220, 133, 30, 50)";
  ctx.font = "bold 50px sans-serif";
  ctx.fillText(("00000000" + score).slice(-7), 680, 170);

  // 残り時間
  let index = Math.min(15, Math.floor(elapsed / (69 / 15)));
  ctx.drawImage(times[index], 615, 327);
}