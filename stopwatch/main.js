(function () {
  'use strict';

  // 各種IDを取得し変数に代入

  var timer = document.getElementById('timer');
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var reset = document.getElementById('reset');

  // スタート時の時間を保持するための変数用意

  var startTime;

  // 経過時間を更新するための変数

  var elapsedTime = 0;

  // clearTimeoutに必要な引数に渡すためのタイマーのidを用意

  var timerId;

  // タイマーを再開させる際に０に戻るのを防止するために必要

  var timeToadd = 0;

  // ミリ秒を分や秒に変換するための関数を用意

  function updateTimeText() {
    
    // m(分) = xミリ秒 / 60000ミリ秒
    var m = Math.floor(elapsedTime / 60000);

    // s(秒) = xミリ秒 % 60000ミリ秒 /1000(余りを割ることで秒を出す)
    var s = Math.floor(elapsedTime % 60000 / 1000);

    // ms(ミリ秒) = 135200 % 10000の余り
    var ms = elapsedTime % 1000;

    // HTML上で表示の際の桁数を固定する

    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('0' + ms).slice(-3);

    // HTMLのid timerの部分に表示させる
    timer.textContent = m + ':' + s + ':' + ms;
  }

  // 再帰的に使えるようの関数
  function countUp() {
    
    // timerId変数はsetTimeoutの返り値
    timerId = setTimeout(function () {

      // 経過時刻は現在時刻(Data.now)からスタートした時間(startTime)を引く
      elapsedTime = Date.now() - startTime + timeToadd;
      updateTimeText()
      // countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
      countUp();
      // 1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言する
    }, 10);
  }

  // startボタンを押した際のイベントを追加
  start.addEventListener('click', function () {
    
    // 現在時刻代入
    startTime = Date.now();

    // 再帰的に使えるようにしておく
    countUp();
  });

  // stopボタンを押した際のイベントを追加
  stop.addEventListener('click', function () {

    // タイマーを止める(clearTimeout)をする。そのためにタイマーのidが必要。
  clearTimeout(timerId);

  // 現状、タイマーに表示される時刻が「 現在時刻 - スタート時刻 」である。
  // タイマーを再開すると過去の経過時刻を保持していないためリセットされてしまう。
  // 対策として「 timeToadd 」に過去の経過時刻を代入して保持させる。
  timeToadd += Date.now() - startTime;
  });

  // resetボタンを押した際のイベントを追加　
  reset.addEventListener('click', function () {
    
    // 経過時間を０に
    elapsedTime = 0;
    // 保持していた過去の経過時間を０に
    timeToadd = 0;
    // 関数を使って表示を更新
    updateTimeText();
  });
})();