var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sensors');

// 設置綱要
var dht11Schema = new mongoose.Schema(
  {
    '溫度': Number,
    '濕度': Number,
    '時間': { type: Date, default: Date.now }
  }
);

// 定義自訂的show()方法
dht11Schema.methods.show = function () {
  var msg = "溫度：" + this['溫度'] +
	      "、濕度：" + this['濕度'] + 
          "、時間：" + this['時間'];

  console.log(msg);  // 在控制台輸出溫、濕度和時間資料
}

// 建立模型
var DHT11 = mongoose.model('dht11', dht11Schema);

DHT11.find(function (err, docs) {
  if ( err || !docs) {
　　console.log("找不到dht11的資料！");
  } else {
    docs.forEach(function(d) {
      var data = new DHT11(d);  // 產生資料物件
      data.show();
    });
  }
});

/*
DHT11.find()
     .select('-_id -時間')
     .and([{'溫度' : { $gte: 24 }}, {'濕度': {$gte:60}}])
     .exec(function(err, docs) {
        if ( err || !docs) {
　　        console.log("找不到dht11的資料！");
        } else {
            console.log(docs);
        }
     });
*/