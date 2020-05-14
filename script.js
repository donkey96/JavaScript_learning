var msg;
var input;

function initial() {
  msg = document.getElementById('msg');
  input = document.getElementById('input');
  msg.textContent = '※何か書いて下さい。';
}

function doclick(e) {
  msg.textContent = '「' + input.value + '」と書きました。';
}