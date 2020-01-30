var io = require("socket.io");
var express = require("express");
var app = express();
app.use(express.static('www'));
var server = app.listen(5438);

var sio = io.listen(server);

sio.on('connection', function(socket){
  setInterval(function(){
    // 每隔2000ms（2秒）發送一次訊息
    socket.emit('pi', { 'msg': 'hello world!' });
  }, 2000);
  socket.on('user', function(data) {
    console.log('用戶：' + data.text);
  });
});