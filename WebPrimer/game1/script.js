// グローバル変数
var gameFlag = false; // ゲームの実行中を示す変数
var score = 0; // スコア
var timerObj = null; // タイマーオブジェクト
var gameObj = null; // ゲームオブジェクト

var bgImage = null; // 背景イメージ
var hitImage = null; // 効果イメージ
var itemImages = null; // アイテムイメージの配列

// ●初期化の処理
function initial() {
  bgImage = new Image();
  bgImage.src = 'images/background.png';
  bgImage.onload = function () {
    drawBackground();
  }
  hitImage = new Image();
  hitImage.src = 'images/hit.png';
  itemImages = [new Image(), new Image(), new Image()];
  itemImages[0].src = 'images/item1.png';
  itemImages[1].src = 'images/item2.png';
  itemImages[2].src = 'images/item3.png';
}

// ●スタート
function start() {
  if (gameFlag == false) {
    score = 0;
    gameFlag = true;
    gameObj = new GameObject();
    timerObj = new TimerObject();
  }
}

// ●マウスイベントの処理
function move(event) {
  if (gameFlag) {
    gameObj.move(event);
  }
}

// ●背景描画
function drawBackground() {
  var context = canvas.getContext('2d');
  context.drawImage(bgImage, 0, 0);
  if (gameFlag == false) {
    context.font='50pt Georgia';
    context.fillStyle='red';
    context.fillText("Collect It!", 250, 200);
    context.font='30pt Georgia';
    context.fillText("click to start", 300, 400);
  }
}

// ★タイマー処理オブジェクト
function TimerObject() {
  var counter = 0; // 呼び出し回数の変数
  var level = 50; // レベルを示す変数
  
  // タイマーで実行される処理
  this.runNow = function () {
    counter += 1;
    if (counter > level) {
      counter = 0;
      if (level > 2) {
        level--;
      }
      gameObj.addItem();
    }
    gameObj.run();
  }

   // タイマースタート
   var timer = setInterval(this.runNow, 50);

   // タイマーの停止処理
   this.stop = function () {
     clearInterval(timer);
     gameFlag = false;
   }
}

// ★ゲーム管理オブジェクト
function GameObject() {
  // 必要な変数

  // アイテムを追加する
  this.addItem = function () {
    
  }

  // マウスイベントの処理
  this.move = function (e) {
    
  }

  // スコア表示
  this.drawScore = function () {
    
  }

  // タイマーで実行するメイン処理
  this.run = function () {
    
  }

  // ヒットしたかチェック
  this.checkHit = function () {
    
  }
}

// ★キャラクタ・オブジェクト
function CharacterObject() {
  // 必要な変数

  // 動かす
  this.move = function (mx, my) {
    
  }

  // 描画
  this.draw = function (canvas) {
    
  }

  // 位置を返す
  this.point = function () {
    
  }
}

// ★アイテム・オブジェクト
function GameItem(img) {
  // 必要な変数

  // 描画する
  this.draw = function (canvas) {
    
  }

  // 位置を返す
  this.point = function () {
    
  }

  // ヒットした時の処理
  this.hit = function () {
    
  }

  // ヒットしたかを調べる
  this.isHit = function () {
    
  }

  // 消去する
  this.clear = function () {
    
  }
}