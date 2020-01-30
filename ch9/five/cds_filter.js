var five = require("johnny-five");
// 請自行修改序列埠參數
var board = new five.Board({port:"COM4", repl:false});

// 即時通訊
var io = require('socket.io');
var express = require("express");
var app = express();

app.use(express.static('www'));
app.use(function(req, res){
	res.statusCode = 404;
	res.end("<h1>ERROR!</h1>");
})

var server = app.listen(5438, function(req, res) {
  console.log("網站伺服器在5438埠口開工了！");
});

var sio = io(server);  // 可以寫成：sio = io.listen(server);

var users = 0;
sio.on('connection', function(socket){
  ++users;
  sockets.emit('cds', { 'val': filterVal });  // 送出濾波值給連線用戶
  
  socket.on('disconnect', function(socket){
    --users;
  });
});

var filterVal = 0;   // 濾波後的值
var oldVal = 0;    // 舊的濾波值
var cdsArr = [0, 0, 0];    // 原始值陣列
var tempArr = [0, 0, 0];  // 暫存處理資料
var total = cdsArr.length;

function filter(val) {   // 濾波函式，接收一個原始值參數。
　　cdsArr.pop();
　　cdsArr.unshift(val);
　
   for (var i=0; i<total; i++) {  // 複製陣列
　　  tempArr[i] = cdsArr[i];
　　}
　　
   tempArr.sort(function (a,b){return a - b});  // 排序
   filterVal = tempArr[0];  // 取第一個濾波元素值
   
   if (users > 0) {  // 如果仍有用戶連線…
     if (filterVal != oldVal) {  // 如果新、舊濾波值不同…
      sio.sockets.emit('cds', { 'val': filterVal });  // 即時傳送濾波值
      oldVal = filterVal;
     }
   }
}

board.on("ready", function() {
  var cds = new five.Sensor("A0");  // 讀取A0腳位值
  
  cds.scale([0, 100]).on("change", function() {
	  var val = Math.floor(this.value);
	  filter(val);  // 過濾輸入值
  });
});