Serial1.setup(9600);  // 初始化Serial1序列埠

var LEDS = [A13,A14,A15];
var LITE = {A: 0b001, B:0b010, C:0b101};

function light(d) {
   digitalWrite(LEDS, d);   // 在LED1~LED3腳位輸出訊號
   setTimeout("digitalWrite(LEDS, 0);", 1000); 
}

Serial1.on('data', function(cmd) {
  console.log(cmd);
  
  switch(cmd) {     // 根據收到的‘a’, ‘b’或‘c’，切換燈光。
    case 'a':
      light(LITE.A);
      break;
    case 'b':
      light(LITE.B);
      break;
    case 'c':
      light(LITE.C);
      break;
  }
});

function onInit() {
  USB.setConsole();
  console.log("ready...");
}