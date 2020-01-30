var mail = require('./pirMail.js');
var exec = require('child_process').exec;
var Gpio = require('onoff').Gpio, 
    pir = new Gpio(7, 'in', 'rising'),  // GPIO7連接PIR訊號輸出腳
    captured = false;				 // 暫存是否已拍照的狀態，預設為「否」。

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

function takePhoto() {
  var file = time() + '.jpg';
  var path = './images/' + file;
  
  var args = 'raspistill -w 640 -h 480 -o ' + path + ' -t 1 -q 40';
  
  exec(args, function(error, stdout, stderr) {
    console.log('error: ' + stderr);

    if (error) {
      throw error;
    } else {
      console.log("拍照中，請微笑～");
      // 寄送信件
      mail.send(file, path);
   }
  });
}

// 處理pir腳位變化的事件處理程式
pir.watch(function(err, value) {
  if (err) exit();

  // 若腳位是「高電位」而且尚未拍照
  if(value == 1 && captured == false)  {
   captured = true;         // 先設定成「已拍照」
   console.log('偵測到入侵者，開始照相存證…');
   takePhoto();           // 拍照
   
   // 5秒定時程式，5秒之後設置成「未拍照」狀態。
   setTimeout(function () {
      captured = false;
    }, 5000);
  }
});

// 關閉程序時，清理資源的自訂函式
function exit() {
  pir.unexport();  // 釋放資源
  console.log('\nbye!');
  process.exit();
}

// 收到「關閉程序」訊息時，執行exit自訂函式。
process.on('SIGINT', exit);
console.log('狗仔相機準備好了～');