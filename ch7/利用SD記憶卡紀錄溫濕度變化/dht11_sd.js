var dht = require("DHT11").connect(A8);
var myBtn = BTN;   // A0

var time = function () {
  var now = new Date();
  var str = now.getFullYear() + '.' + 
          (now.getMonth()+1) + '.' +
          now.getDate()
           + '_' + 
          ((now.getHours() < 10) ? "0" : "") + now.getHours()
           + '.' +
          ((now.getMinutes() < 10) ? "0" : "") + now.getMinutes() 
           + '.' + 
          ((now.getSeconds() < 10) ? "0" : "") + now.getSeconds();
    
  return str;
};

function doLog() {
  digitalPulse(LED2,1,50); 	// 閃爍一下LED2，告知目前正在寫入資料。
  dht.read(function (d) {
　　logFile.write(time() + ",temp: "+d.temp.toString()+",RH: "+d.rh.toString() +"\r\n");
  });
}

// 偵測按鈕是否被按下的事件處理程式
setWatch(function() {
  if (logFile === undefined) {
   logFile = E.openFile("tempLog.txt", "a");
   digitalWrite(LED1,1);
   iid = setInterval(doLog, 5000);
  } else {
    clearInterval(iid);
    iid = undefined;	
    logFile.close();
    logFile = undefined;
    E.unmountSD();
    digitalWrite(LED1,0);
  }
}, myBtn, { repeat:true, edge:'rising', debounce:30 });

setDeepSleep(1);
save();