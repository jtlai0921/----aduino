var express = require('express');
var app = express();
var users = 0;

app.use(express.static("www"));

var server = app.listen(5438, function() {  
     console.log('網站在5438埠開工了');
});

var io = require('socket.io');
var five = require("johnny-five");
// 請自行修改序列埠
var board = new five.Board();
var servos = {};

var sio = io(server);

board.on("ready", function() {
  servos = {
    x: new five.Servo({
      pin: 4,
      startAt: 90     
    }),
    y: new five.Servo({
      pin: 5,
      startAt: 90
    })
  };
});

sio.on('connection', function(socket){
  console.log('用戶連線');
  
  socket.on('disconnect', function() {
    console.log('用戶離線');
  });
  
  // 接收用戶端傳來的‘face’事件與資料
  socket.on('face', function(data) {
     // 在控制台顯示接收到的x, y座標
     console.log('馬達旋轉角度，x：' + data.x + ', y: ' + data.y);
     // 轉動伺服馬達
     servos.x.to(data.x);
     servos.y.to(data.y);
  });
});