function calc(max) {
  var total = 0
  for(var num = 1;num <= max;num++){
    total += num;
  }
  return total;
}

document.write('<ol>');
document.write('<li>10まで:' + calc(10) + '</li>');
document.write('<li>20まで:' + calc(20) + '</li>');
document.write('<li>30まで:' + calc(30) + '</li>');
document.write('<li>40まで:' + calc(40) + '</li>');
document.write('<li>50まで:' + calc(50) + '</li>');
document.write('</ol>')
