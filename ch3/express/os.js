var os = require("os");
var express = require("express");
var app = express();

/*
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
*/

app.get('/', function(req, res) {
   var hostname = os.hostname();
   var freemem = Math.ceil(os.freemem() / 1024 / 1024) + "MB";
   
   res.jsonp({host: hostname, mem:freemem});
});

app.listen(5438, function(req, res) {
  console.log("網站伺服器在5438埠口開工了！");
});