var Gpio = require('onoff').Gpio, 
  led = new Gpio(18, 'out');  // LED接GPIO 18腳
  
function blink() {
    var id = setInterval(function () {
        led.writeSync(led.readSync() ^ 1);
    }, 200);
 
    setTimeout(function () {
        clearInterval(id);
        led.writeSync(0); 
        led.unexport();   // 釋放資源
    }, 5000);
}

blink();