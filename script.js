var seiseki = new Object();
seiseki.data = {'国語':100, '数学':82, '理科':69, '社会':77, '英語':91};

// データの数を計算する
seiseki.count = function() {
  var n = 0;
  for(var key in this.data){ n++; }
  return n;
}
// 合計を計算する
seiseki.total = function() {
  var total = 0;
  for(var key in this.data){
    total += this.data[key];
  }
  return total;
}
// 平均を計算する
seiseki.average = function() {
  return this.total() / this.count();
}
// データを出力する
seiseki.print = function() {
  document.write('<ol>');
  for(var key in this.data) {
    document.write('<li>' + key + ':' + this.data[key] + '点</li>');
  }
  document.write('</ol>');
}
// ここからがメインプログラム
document.write('<h2>定期試験の結果</h2>');
seiseki.print();
document.write('<p>合計:' + seiseki.total() + ' 平均点:' + seiseki.average() + ' でした。</p>');