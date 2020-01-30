var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/www/index.html");
});

app.get("/blog", function(req, res) {
  res.redirect("http://swf.com.tw");
});

app.get("*", function(req, res) {
  res.status(404);
  res.send("找不到網頁！");
});

app.listen(5438, function(req, res) {
  console.log("網站伺服器在5438埠口開工了！");
});