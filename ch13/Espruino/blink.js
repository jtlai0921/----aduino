var BTN = D0;   // 定義按鍵腳
var LED = D2;   // 定義LED腳

pinMode(BTN, "input");   // 按鍵腳設置成「輸入」
pinMode(LED, "output");  // LED腳設置成「輸出」

digitalWrite(LED, 1);     // 關閉LED燈

setWatch(function() {     // 檢測按鍵
  digitalPulse(LED, 0, 50);  // 閃爍一下LED
}, BTN, { repeat: true, edge: "falling", debounce : 30 });