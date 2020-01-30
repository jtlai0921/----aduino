setInterval(function () {
  var light = analogRead(A1);   // 讀取A1腳的類比輸入
  if (light > 0.5) digitalWrite(LED2, 1);  // 點亮A14腳的LED2
  if (light < 0.4) digitalWrite(LED2, 0);
}, 100);

save();