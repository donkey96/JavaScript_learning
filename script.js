function Seiseki(name, data) {
  this.name = name;
  this.data = data;

  // データの数を計算する
  this.count = function() {
    var n = 0;
    for(var key in this.data){ n++; }
    return n;
  }
  // 合計を計算する
  this.total = function() {
    var total = 0;
    for(var key in this.data){
      total += this.data[key];
    }
    return total;
  }
  // 平均を計算する
  this.average = function() {
    return this.total() / this.count();
  }
  // データを出力する
  this.print = function() {
    document.write('<h2>' + this.name + 'の成績</h2>');
    document.write('<ol>');
    for(var key in this.data) {
      document.write('<li>' + key + ':' + this.data[key] + '点</li>');
    }
    document.write('</ol>');
    document.write('<p>合計:' + this.total() + '<br>');
    document.write('平均点:' + this.average() + '</p>');
  }
}

var taro = new Seiseki('たろう', {'国語':65, '数学':79, '理科':88, '社会':59, '英語':61});
taro.print();
var sachiko = new Seiseki('さちこ', {'国語':100, '数学':82, '理科':69, '社会':77, '英語':91});
sachiko.print();