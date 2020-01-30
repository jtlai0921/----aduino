var TRIG = C7;   // 超音波觸發接腳
var ECHO = C8;  // 超音波回應接腳
var t = 0;        // 暫存超音波回應訊號的時間
var dist = 0;      // 暫存距離值

setWatch(function(e) { 
  t=e.time;  // 紀錄觸發時間（秒）
}, ECHO, { repeat:true, edge:'rising'});

setWatch(function(e) { 
  var dt=e.time-t;  // 時間差
  dist = (dt*1000000)/58; 
},  ECHO, { repeat:true, edge:'falling'});

setInterval(function(){
  digitalPulse(TRIG,1, 10/1000);
},50);

setInterval(function() {
  console.log(dist + " cm");
}, 1000);