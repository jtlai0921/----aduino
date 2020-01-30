var five = require("johnny-five");
// 請自行設置序列埠
// var board = new five.Board({ port: "COM4" });
// var board = new five.Board({ port: "/dev/ttyAMA0" });
var board = new five.Board();

board.on("ready", function() {
  var temp = new five.Thermometer({
    pin: "A0",          // 接腳
    controller: "LM35"  // 溫度感測器類型
  });

  temp.on("change", function(){
    console.log("溫度: %d", this.celsius);
  });
});