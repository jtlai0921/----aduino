var five = require("johnny-five");
// 請自行設置序列埠
// var board = new five.Board({ port: "COM4" });
// var board = new five.Board({ port: "/dev/ttyAMA0" });
var board = new five.Board();

board.on("ready", function() {
  // 宣告自訂的矩陣圖像
  var pict = [0x3C,0x7E,0x7E,0xDB,
           0xFF,0x18,0x24,0x5A];
  // 宣告LED矩陣物件
  var matrix = new five.Led.Matrix({
    pins: {
      data: 11,   // 資料腳
      clock: 13,  // 時脈腳
      cs: 10     // 晶片選擇腳
    }
  });

  matrix.on();       // 開啟LED矩陣 
  matrix.draw(pict);  // 顯示自訂圖像
});