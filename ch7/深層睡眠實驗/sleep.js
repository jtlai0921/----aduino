function onInit() {
  setSleepIndicator(LED1);
}

setInterval(function() {
  digitalPulse(LED2,1,50);
}, 3000);

setWatch(function() {
  digitalPulse(LED3,1,100);
}, BTN, {repeat:true, edge:'rising', debounce:30});

setDeepSleep(1);
save();