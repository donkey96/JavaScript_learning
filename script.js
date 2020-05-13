var arr = [100, 82, 69, 77, 91];
var total = 0;
for(var n in arr) {
  total += arr[n];
}

var average = total / 5;
document.write('<p>合計は、' + total + 'です。平均は、' + average + 'です。</p>');