Serial1.setup(9600);

var dir = {
  forward:0b11,	// 前進
  left:0b01,    // 左轉
  right:0b10,	// 右轉
  back:0b00  	// 後退
};

function motor(dir, pwm) {
　　analogWrite(B3, pwm, { freq: 500 });
　　analogWrite(B7, pwm, { freq: 500 });
　　digitalWrite([B4, B8], dir);  // 設定馬達的轉向
}

/* 
// 另一種馬達控制器的版本
var dir = {
  forward:0b1010,  // 前進
  left:0b1001,		// 左轉
  right:0b0110,	    // 右轉
  back:0b0101  	// 後退
};

function motor(dir, pwm) {
　　analogWrite(B3, pwm, { freq: 500 });
　　analogWrite(B7, pwm, { freq: 500 });
　　digitalWrite([B4, B5, B8, B9], dir);	 // 設定馬達的轉向
}
*/

Serial1.on('data', function(cmd) {
  console.log(cmd);
  
  switch(cmd) {
    case 'w' :    // 前進
      motor(dir.forward, 0.6);
      break;
    case 'a':		// 左轉
      motor(dir.left, 0.6);
      break;
    case 'd':		// 右轉
      motor(dir.right, 0.6);
      break;
    case 's':		// 後退
      motor(dir.back, 0.6);
      break;
    case 'x':		// 停止
      motor(0, 0);
      break;
  }
});

function onInit() {
  USB.setConsole();
  console.log("ready...");
}
save();