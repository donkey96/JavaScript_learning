var arr = {'国語':100, '数学':82, '理科':69, '社会':77, '英語':91};
var total = 0;
document.write('<ol>');
for(var key in arr) {
  document.write('<li>' + key + ':' + arr[key] + '点</li>');
  total += arr[key];
}
document.write('</ol>');
var average = total / 5;
document.write('<p>※合計:' + total + '</p>');
document.write('<p>平均点:' + average + '</p>');