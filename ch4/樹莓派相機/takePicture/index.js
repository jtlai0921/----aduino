var exec = require('child_process').exec;  // 引用程式庫

// 自訂「時間」函式
var time = function () {
  var now = new Date();
  var str = now.getFullYear() + '.' + 
          (now.getMonth()+1) + '.' +
          now.getDate()
           + '_' + 
          ((now.getHours() < 10) ? "0" : "") + now.getHours()
           + '.' +
          ((now.getMinutes() < 10) ? "0" : "") + now.getMinutes() 
           + '.' + 
          ((now.getSeconds() < 10) ? "0" : "") + now.getSeconds();
    
  return str;
};

var cmd = 'raspistill -w 640 -h 480 -t 1 -q 40 -o ./images/'
          + time() + '.jpg';

exec(cmd, function(error, stdout, stderr) {
  if (error !== null) {
    console.log('exec執行錯誤：' + error);
  } else {
    console.log('拍攝完畢！');
  }
});