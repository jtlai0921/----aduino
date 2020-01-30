var five = require("johnny-five"),
    button, led;
// 若有必要，請自行設置序列埠
// var board = new five.Board({ port: "COM4" });
// var board = new five.Board({ port: "/dev/ttyAMA0" });
var board = new five.Board();

board.on("ready", function() {
  led = new five.Led(13);
  
  button = new five.Button({
      pin: 2,
      isPullUp: true
  });
  
  button.on("down", function () {
      led.on();
  });
  
  button.on("up", function () {
      led.off();
  });
});