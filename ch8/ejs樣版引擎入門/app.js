var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  // 傳遞參數
  res.render('index', {usr: '">阿蝙"',
                       types: ['Arduino', 'Raspberry Pi', 'JavaScript']});

});

var server = app.listen(5438, function () {
  console.log('網站在5438埠口開通了！');

});