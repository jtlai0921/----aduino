var five = require("johnny-five");
// 請自行設置序列埠
// var board = new five.Board({ port: "COM4" });
// var board = new five.Board({ port: "/dev/ttyAMA0" });
var board = new five.Board();

board.on("ready", function() {
  var led = new five.Led(11);
  var pot = new five.Sensor({
        pin: "A0",
        freq: 500,
        threshold:10
      });

  pot.scale([0, 255]).on("data", function() {
    var pwm = Math.floor(this.value);
　　 console.log("PWM輸出值：", pwm);
    led.brightness(pwm);
  });
});