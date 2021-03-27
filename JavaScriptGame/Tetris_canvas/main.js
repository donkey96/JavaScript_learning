"use strict";

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

  // テトロミノ本体
  let tetro = [
    [ 0, 0, 0, 0 ],
    [ 1, 1, 0, 0 ],
    [ 0, 1, 1, 0 ],
    [ 0, 0, 0, 0 ]
  ];

  // テトロミノの座標
  let tetro_x = 0;
  let tetro_y = 0;

function init() {
  let can = document.getElementById("can");
  let context = can.getContext('2d');

  can.width = SCREEN_W;
  can.height = SCREEN_H;
  can.style.border = "4px solid #555"

  drawTetro();

  document.onkeydown = function (e) {
    switch (e.key) {
      case "ArrowLeft":
        tetro_x--;
        break;
      case "ArrowUp":
        tetro_y--;
        break;  
      case "ArrowRight":
        tetro_x++;
        break;
      case "ArrowDown":
        tetro_y++;
        break;
      case " ":
        break;
    }
    drawTetro();
  }
}
  // テトロミノを表示する関数
  function drawTetro() {
    let can = document.getElementById("can");
    let context = can.getContext('2d');

    context.clearRect(0, 0, SCREEN_W, SCREEN_H);
    

    for (let y = 0; y < TETRO_SIZE; y++ ) {
      for (let x = 0; x < TETRO_SIZE; x++) {
        if ( tetro[y][x] == 1 ) {
          let px = ( tetro_x + x ) * BLOCK_SIZE;
          let py = ( tetro_y + y ) * BLOCK_SIZE;

          context.fillStyle = 'red';
          context.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);  
          context.strokeStyle='black';
          context.strokeRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
        }
      }
    }
  }
