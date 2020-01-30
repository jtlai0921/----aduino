var sensor = require("HC-SR04").connect(C7,C8,function(dist){
   console.log(dist+"cm");
});

setInterval(function() {
  sensor.trigger();   // 每隔1秒觸發超音波 
}, 1000);