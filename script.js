const max = 12345; // ★最大の値
var num = 1;
var total = 0

while(num <= max) {
  total += num;
  num++;
}
document.write('<p>' + max + 'までの合計は、' + total + 'です。');