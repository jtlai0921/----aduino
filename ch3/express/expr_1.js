var express = require("express");
var app = express();

app.get('/', function(req, res) {
  res.send("歡迎光臨！");
});
app.listen(5438, function(req, res) {
  console.log("網站伺服器在5438埠口開工了！");
});