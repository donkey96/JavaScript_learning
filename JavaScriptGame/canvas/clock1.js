let context;
let h;
let m;
let s;

// よく使うid習得の手順を関数化
function gobj(id) { return document.getElementById(id); }

function init() {
  context = gobj("clock").getContext('2d');
  setInterval(tick, 1000);
}

// 時、分、秒を求める(％１２だけ謎)
function tick() {
  let now = new Date();
  h = now.getHours() % 12;
  m = now.getMinutes();
  s = now.getSeconds();
  gobj("time").textContent = now.toTimeString();
  paint();
}

// 線を引く関数。針を作るのに利用
function drawHand(rotation, length, width, color) {
  context.save();
  context.lineWidth = width;
  context.strokeStyle = color;
  context.translate(150, 150);
  context.rotate(rotation);
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(0, -length);
  context.stroke();
  context.restore();
}

// 時間と連動して線を引くための処理をまとめた関数
function paint() {
  context.clearRect(0, 0, 300, 300);

  context.save();
  context.translate(150, 150);
  context.strokeStyle='black';
  let pitch = Math.PI * 2 / 60;
  for (let i = 0; i < 60; i++) {
    context.beginPath();
    context.lineWidth = (i % 5) == 0 ? 3 : 1; // 三項演算子（条件 ? true : false）
    context.moveTo(0, -120);
    context.lineTo(0, -140);
    context.stroke();
    context.rotate(pitch);
  }
  context.restore();
  
  // 時間を使ってラジアン（角度）を求める
  // (Math.PI * 2)は360度をラジアンに直したもの。12で割れば１時間のラジアンが出る。
  let radH = (Math.PI * 2) / 12 * h + (Math.PI * 2) / 12 * (m / 60);
  let radM = (Math.PI * 2) / 60 * m;
  let radS = (Math.PI * 2) / 60 * s;

  drawHand(radH, 80, 6, "blue");
  drawHand(radM, 120, 4, "blue");
  drawHand(radS, 140, 2, "red");
}