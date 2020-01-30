var express = require("express");
var app = express();

app.get('/', function(req, res) {
  res.end("<h1>你好！</h1>");
});

app.get('/sw/:pin', function(req, res) {
  res.send('收到的腳位編號：' + req.params.pin);
});

app.get('/arduino/:pin/:val?', function(req, res) {
  var html = "腳位：" + req.params.pin + "<br>" +
             "狀態：" + req.params.val;
  res.send(html);
});

app.get("/control", function(req, res) {
  var pin = req.query.pin;
  var val = req.query.val;

  if (pin != undefined && val != undefined) {
    var html = "腳位：" + pin + "<br>" +
               "狀態：" + val;
    res.send(html);
  } else {
    res.send("沒收到資料！");
  }
});

app.listen(5438, function(req, res) {
  console.log("網站伺服器在5438埠口開工了！");
});