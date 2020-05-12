var month = 4;
var season;

switch(month) {
  case 1: season = '冬'; break;
  case 2: season = '冬'; break;
  case 3: season = '春'; break;
  case 4: season = '春'; break;
  case 5: season = '春'; break;
  case 6: season = '夏'; break;
  case 7: season = '夏'; break;
  case 8: season = '夏'; break;
  case 9: season = '秋'; break;
  case 10: season = '秋'; break;
  case 11: season = '秋'; break;
  case 12: season = '冬'; break;
  default: season = '???';
}
document.write('<p>' + month + '月は、' + season + 'です。');