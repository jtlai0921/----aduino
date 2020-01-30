var five = require("johnny-five");
// 請自行設置序列埠
// var board = new five.Board({ port: "COM4" });
// var board = new five.Board({ port: "/dev/ttyAMA0" });
var board = new five.Board();

var servos;

board.on("ready", function() {
  console.log("Arduino控制板已連線！");
  this.pinMode(13, five.Pin.OUTPUT);

  // 設定接腳初始角度  
  servos = {
    x: new five.Servo({
     pin: 9,           // Arduino接腳編號
　　　startAt: 80,       // 初始角度 
　　　range: [80, 110]   // 設定馬達的旋轉角度範圍
    }),
    y: new five.Servo({
      pin: 10,
      startAt: 120
    })
  };
  
  board.repl.inject({   // 開放sx, sy和led物件給文字命令操作
    s: servos,
    led: new five.Led(13)
  });
});