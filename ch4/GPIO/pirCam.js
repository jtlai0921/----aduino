var exec = require('child_process').exec;
var Gpio = require('onoff').Gpio,
  pir = new Gpio(7, 'in', 'rising'),
  captured = false;

var time = function () {
    var now = new Date();
    var str = now.getFullYear() + '.' + 
	        (now.getMonth()+1) + '.' +
            now.getDate() + '_' + 
            now.getHours() + '.' +
            now.getMinutes() + '.' + 
            now.getSeconds();
    
    return str;
};

function takePhoto() {
  // 影像檔以自訂日期格式為名，存入img資料夾。
  var imgFile = './img/' + time() + '.jpg';
  // 拍照並存檔
  var args = 'raspistill -w 640 -h 480 -o ' + imgFile + ' -t 1 -q 40';
  exec(args, function(error, stdout, stderr) {
    if (error) {
      throw error;
    } else {
      console.log("拍照中，請微笑～");
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

function exit() {
  pir.unexport();
  console.log('\n結束程式');
  process.exit();
}

process.on('SIGINT', exit);
console.log('自動拍照裝置準備好了～');