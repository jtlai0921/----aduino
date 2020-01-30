var Gpio = require('onoff').Gpio, 
  led = new Gpio(18, 'out'),
  button = new Gpio(4, 'in', 'both');
  
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

button.watch(function(error, value){
  if (error) {
      throw error;
  }
  
  if (value == 1) {
      blink();
  }
});

function exit() {
  led.unexport();
  button.unexport();
  console.log('\n結束程式');
  process.exit();
}

process.on('SIGINT', exit);