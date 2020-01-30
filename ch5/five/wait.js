var five = require("johnny-five"),
    ledPin = 13;   // LED接在13腳
// 若有必要，請自行設置序列埠
// var board = new five.Board({ port: "COM4" });
// var board = new five.Board({ port: "/dev/ttyAMA0" });
var board = new five.Board();

board.on("ready", function() {
  this.pinMode(ledPin, this.MODES.OUTPUT);
  this.digitalWrite(ledPin, 1);
 
  this.wait(3000, function() {     // 設定一個3秒延時程式
    this.digitalWrite(ledPin, 0);
  });
});