var minDist = 10,  // 最小距離（公分）
   maxDist = 30,  // 最大距離（公分）
   limitDist = 40;  // 偵測範圍上限（公分）
   
// 依據輸入距離，調整輸出PWM。
function setPWM(dist) {
  var pwm = 0;
  
  dist = (dist<minDist)?minDist:dist;
  dist = (dist>maxDist)?maxDist:dist;
  
  pwm = (dist-minDist) / (maxDist - minDist);
  analogWrite(C6, pwm);
}

// 引用超音波模組，並且設定回應距離的事件函式
var sensor = require("HC-SR04").connect(C7,C8,function(dist) {
  if (dist < limitDist) {
    setPWM(dist);
  }
});

setInterval(function() {
  sensor.trigger();   // 觸發超音波
}, 500);

save();