var servoPos = 0.5;  // 預設脈衝寬度
var cdsPin = C4;    // 光敏電阻腳位
var servoPin = A1;  // 伺服馬達腳位

function map(val) {  // 轉換類比輸入值與PPM脈衝寬度
  val *= 1000;
  return Math.floor(val / 0.5263 + 500) / 1000;
}

setInterval(function() {  // 每0.5秒檢測一次亮度值
  var light = analogRead(cdsPin);
  servoPos = map(light);
}, 500);

setInterval(function() {  // 以20ms為週期，送出伺服馬達的脈衝訊號。
  digitalPulse(servoPin,1,E.clip(servoPos, 0.5, 2.4));
}, 20);