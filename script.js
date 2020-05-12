function calc(max) {
  var total = 0;
  for(var num = 1;num <= max;num++) {
    total += num;
  }
  document.write('<p>' + max + 'までの合計は、' + total + 'です。');
}

calc(10);
calc(100);
calc(1000);
calc(10000);