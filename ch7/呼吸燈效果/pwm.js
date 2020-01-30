var step = 4;   // 原本是0.04
var pwm = 0;

setInterval(function() {
  pwm += step;  // 逐漸增加或減少pwm值
  analogWrite(C6, pwm/100);
  if (pwm == 100 || pwm === 0) {
    step *= -1;
  }
}, 60);