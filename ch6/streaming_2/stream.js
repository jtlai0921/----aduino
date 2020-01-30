var express = require('express');
var spawn = require('child_process').spawn;
var app = express();
var users = 0;

app.use(express.static("www"));

// 啟動網站伺服器時，一併啟動串流視訊
var server = app.listen(5438, function() {
     var args = ["-o", "output_http.so -w /usr/local/www", "-i", "input_raspicam.so"];
     spawn('mjpg_streamer', args);
     
     console.log('網站在5438埠口開工了！');
});