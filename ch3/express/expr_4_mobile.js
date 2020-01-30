var express = require("express");
var app = express();

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/', function(req, res) {
  res.end("<h1>你好！</h1>");
});

app.get('/sw/:pin', function(req, res) {
  //res.send('收到的腳位編號：' + req.params.pin);
  res.json({"pin": req.params.pin});
  console.log("pin: " + req.params.pin);
});

app.get('/arduino/:pin/:val?', function(req, res) {
  var html = "腳位：" + req.params.pin + "<br>" +
             "狀態：" + req.params.val;
  //res.send(html);
  res.json({"pin": req.params.pin, "val":req.params.val});
});

app.listen(5438, function(req, res) {
  console.log("網站伺服器在5438埠口開工了！");
});