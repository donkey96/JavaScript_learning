let context;
let p0; // クリックの開始位置を記録する変数

function init() {
  let canvas = document.getElementById("canvas");
  context = canvas.getContext('2d');
  context.strokeStyle = "#FF0000";
  // クリックを押したときと離したときでそれぞれイベントを設定
  canvas.addEventListener("mousedown", function (e) {
    // イベントオブジェクトのoffsetプロパティを使用して現在の座標を取得し変数に連想配列で格納
    p0 = {x: e.offsetX, y: e.offsetY};
  }
  );
  canvas.addEventListener("mouseup", function (e) {
    // クリックを離すときに一度canvasの範囲内の描画をリセットする
    context.clearRect(0, 0, 500, 500);
    // パスを通す
    context.beginPath();
    // クリック時の座標に筆を下ろす
    context.moveTo(p0.x, p0.y);
    // クリックを離した座標まで筆を走らせる
    context.lineTo(e.offsetX, e.offsetY);
    // 筆が動いた軌跡に線を描画する
    context.stroke();
  });
}
