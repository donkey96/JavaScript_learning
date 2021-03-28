"use strict";

// 落ちるスピード
const GAME_SPEED = 300;

// フィールドのサイズ
const FIELD_COL = 10;
const FIELD_ROW = 20;

// ブロック一つのサイズ(ピクセル)
const BLOCK_SIZE = 30;

// キャンバスサイズ(スクリーンサイズ)
const SCREEN_W = BLOCK_SIZE * FIELD_COL;
const SCREEN_H = BLOCK_SIZE * FIELD_ROW;

// テトロミノのサイズ
const TETRO_SIZE = 4;

// テトロの色
const TETRO_COLORS = [
  "#000",               // 0.空
  "#6CF",               // 1.水色
  "#F92",               // 2.オレンジ
  "#66F",               // 3.青
  "#C5C",               // 4.紫
  "#FD2",               // 5.黄色
  "#F44",               // 6.赤
  "#5B5"                // 7.緑
]

// テトロミノの形を定義
const TETRO_TYPES = [
  [],               // 0.空っぽ
  [                 // 1.I
    [ 0, 0, 0, 0 ],
    [ 1, 1, 1, 1 ],
    [ 0, 0, 0, 0 ],
    [ 0, 0, 0, 0 ]
  ],
  [                 // 2.L
    [ 0, 1, 0, 0 ],
    [ 0, 1, 0, 0 ],
    [ 0, 1, 1, 0 ],
    [ 0, 0, 0, 0 ]
  ],
  [                 // 3.J
    [ 0, 0, 1, 0 ],
    [ 0, 0, 1, 0 ],
    [ 0, 1, 1, 0 ],
    [ 0, 0, 0, 0 ]
  ],
  [                 // 4.T
    [ 0, 1, 0, 0 ],
    [ 0, 1, 1, 0 ],
    [ 0, 1, 0, 0 ],
    [ 0, 0, 0, 0 ]
  ],
  [                 // 5.O
    [ 0, 0, 0, 0 ],
    [ 0, 1, 1, 0 ],
    [ 0, 1, 1, 0 ],
    [ 0, 0, 0, 0 ]
  ],
  [                 // 6.Z
    [ 0, 0, 0, 0 ],
    [ 1, 1, 0, 0 ],
    [ 0, 1, 1, 0 ],
    [ 0, 0, 0, 0 ]
  ],
  [                 // 7.S
    [ 0, 0, 0, 0 ],
    [ 0, 1, 1, 0 ],
    [ 1, 1, 0, 0 ],
    [ 0, 0, 0, 0 ]
  ],
]

const START_X = FIELD_COL / 2 - TETRO_SIZE / 2;
const START_Y = 0;

// テトロミノ本体
let tetro;

// テトロミノの座標
let tetro_x = START_X;
let tetro_y = START_Y;

// テトロミノの形
let tetro_t;

// テトロミノをランダムに一つ用意 
tetro_t = Math.floor( Math.random() * (TETRO_TYPES.length - 1) ) + 1;
tetro = TETRO_TYPES[tetro_t];

// フィールドの中身
let field = [];

// 本プログラム
function main() {
  let can = document.getElementById("can");

  can.width = SCREEN_W;
  can.height = SCREEN_H;
  can.style.border = "4px solid #555"

  init();
  drawAll();

  setInterval( dropTetro, GAME_SPEED );

  // キーボードが押された時の処理
  document.onkeydown = function (e) {
    switch (e.key) {
      case "ArrowLeft": // 左
        if ( checkMove(-1, 0) ) tetro_x--;
        break;
      case "ArrowUp": // 上
      if ( checkMove(0, -1) ) tetro_y--;
        break;  
      case "ArrowRight": // 右
      if ( checkMove(+1, 0) ) tetro_x++;
        break;
      case "ArrowDown": // 下
      if ( checkMove(0, +1) ) tetro_y++;
        break;
      case " ": // スペース
      let ntetro = rotate();
      if ( checkMove(0, 0, ntetro) ) tetro = ntetro;
        break;
    }
    drawAll();
  }
}

// 初期化
function init() {
  for (let y = 0; y < FIELD_ROW; y++ ) {
    field[y] = [];
    for (let x = 0; x < FIELD_COL; x++) {
      field[y][x] = 0;
    }
  }

  // テスト
  field[5][8] = 1;
  field[19][0] = 1;
  field[19][9] = 1;
}

// 全てを描画する関数
function drawAll() {
  let can = document.getElementById("can");
  let context = can.getContext('2d');

  context.clearRect(0, 0, SCREEN_W, SCREEN_H);
  
  // フィールドを作成
  for (let y = 0; y < FIELD_ROW; y++ ) {
    for (let x = 0; x < FIELD_COL; x++) {
      if ( field[y][x] ) {
        drawBlock(x, y, field[y][x]);
      }
    }
  }

  // テトロミノを作成
  for (let y = 0; y < TETRO_SIZE; y++ ) {
    for (let x = 0; x < TETRO_SIZE; x++) {
      if ( tetro[y][x] ) {
        drawBlock(tetro_x + x, tetro_y + y, tetro_t);
      }
    }
  }
}

// ブロック１つを描画する関数
function drawBlock(x, y, c) {
  let can = document.getElementById("can");
  let context = can.getContext('2d');    

  let px = x * BLOCK_SIZE;
  let py = y * BLOCK_SIZE;

  context.fillStyle = TETRO_COLORS[c];
  context.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);  
  context.strokeStyle='black';
  context.strokeRect(px, py, BLOCK_SIZE, BLOCK_SIZE);

}

// 当たり判定
function checkMove(mx, my, ntetro) {
  if ( ntetro == undefined ) ntetro = tetro;
  for (let y = 0; y < TETRO_SIZE; y++ ) {
    for (let x = 0; x < TETRO_SIZE; x++) {
      let nx = tetro_x + mx + x;
      let ny = tetro_y + my + y;
      if (ntetro[y][x]) {
        if ( ny < 0 ||
             nx < 0 ||
             ny >= FIELD_ROW ||
             nx >= FIELD_COL ||
             field[ny][nx] ) {
               return false;
        }
      }
    }
  }
  return true;
}
// テトロの回転
function rotate() {
  let ntetro = [];
  for (let y = 0; y < TETRO_SIZE; y++ ) {
    ntetro[y] = [];
    for (let x = 0; x < TETRO_SIZE; x++) {
      ntetro[y][x] = tetro[TETRO_SIZE - x - 1][y];
    }
  } 
  return ntetro;
}

function fixTetro() {
  for (let y = 0; y < TETRO_SIZE; y++ ) {
    for (let x = 0; x < TETRO_SIZE; x++) {
      if (tetro[y][x]) {
        field[tetro_y + y][tetro_x + x] = tetro_t;
      }
    }
  }
}

// テトロが落ちる関数
function dropTetro() {
  if ( checkMove(0, +1) ) tetro_y++;
  else {
    fixTetro();
    tetro_t = Math.floor( Math.random() * (TETRO_TYPES.length - 1) ) + 1;
    tetro = TETRO_TYPES[tetro_t];
    tetro_x = START_X;
    tetro_y = START_Y;
  }
  drawAll();
}