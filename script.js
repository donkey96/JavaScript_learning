const max = 12345; // ★最大の値
var total = 0

for(var num = 1;num <= max;num++) {
  total += num;
}
document.write('<p>' + max + 'までの合計は、' + total + 'です。');