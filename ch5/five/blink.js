var five = require("johnny-five");
// 若有必要，請自行設置序列埠
// var board = new five.Board({ port: "COM4" });
// var board = new five.Board({ port: "/dev/ttyAMA0" });
var board = new five.Board();

board.on("ready", function() {
  // this.pinMode(13, five.Pin.OUTPUT);
  console.log("Arduino連線成功！");
  var led = new five.Led(13);
  
  led.blink(200);
});