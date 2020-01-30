var express = require("express");
var app = express();

app.use(express.static('www'));
app.use('/files', express.static('uploads'));

app.listen(5438, function(req, res) {
  console.log("網站伺服器在5438埠口開工了！");
});