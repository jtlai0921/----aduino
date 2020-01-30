var DHT11 = require('./models/dht11');  // 引用models路徑中的dht11模組
var express = require('express');        // 引用node_modules路徑裡的express套件
var app = express();

app.get("/th", function(req, res) {
  var temp = req.query.t;    // 讀取查詢字串的t（溫度）值
  var humid = req.query.h;  // 讀取查詢字串的h（濕度）值

  if (temp != undefined && humid != undefined) {  // 只要temp和humid都有值…
    var data = new DHT11({ '溫度': temp, '濕度': humid });  // 依據模型建立資料
    data.save(function (err) {  // 儲存資料，回呼函式將接收錯誤訊息。
      if (err) {             // 如果err有值，代表儲存過程出現問題。
        console.log('出錯啦～');
      } else {
        console.log('儲存成功！');
        // 在網頁上顯示接收到的溫濕度值
        res.send("溫度: " + temp + "&deg;C，濕度： " + humid +"%");
      }
    });
  } else {
  	console.log("沒收到資料！");
  }
});