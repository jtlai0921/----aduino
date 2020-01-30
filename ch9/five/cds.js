var five = require("johnny-five");  // 引用霹靂五號程式庫
// 請自行修改埠號
var board = new five.Board({port:"COM4", repl:false});
var io = require('socket.io'); 
var express = require("express");
var app = express();

app.use(express.static('www'));

var server = app.listen(5438, function(req, res) {
  console.log("網站伺服器在5438埠口開工了！");
});

var sio = io(server);
var users = 0;   // 紀錄目前線上人數
var newVal = 0;  // 紀錄新的類比檢測值
sio.on('connection', function(socket){
  console.log("用戶連線");
  ++users;
  // 傳送當前的即時數據給新連線用戶
  sio.sockets.emit('cds', { 'val': newVal });  // 傳出即時感測資料
  
  socket.on('disconnect', function(socket){
    console.log("用戶離線");
    --users;
  });
});

board.on("ready", function() {
  var cds = new five.Sensor("A0");
  var oldVal = 0;
  
  cds.scale([0, 100]).on("change", function() {
	  newVal = Math.floor(this.value);
	  
     if (users > 0) {   // 只要仍有用戶連線…
	    if (newVal != oldVal) {
		  sio.sockets.emit('cds', { 'val': newVal });  // 傳出即時感測資料
	    }
	    oldVal = newVal;
     }
  });
});