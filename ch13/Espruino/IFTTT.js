var wifi = require("Wifi");
var http = require("http");
var ssid = "你的網路SSID";
var pass = "你的網路密碼";
var IFTTTKEY = "你的IFTTT鍵碼";
var BTN = D0;

wifi.connect(ssid, {"password":pass},
     function(err){ 
        if (err === null) {
           netInfo = wifi.getIP();
           console.log("IP: " + netInfo.ip);
        } else {
           console.log("Connect ERROR: " + err);
        }
      }
);

function sendEvent(event, data) {
  var val = JSON.stringify(data);
  var opts = {
    host:'maker.ifttt.com',
    port:'80',
    path:"/trigger/"+event+"/with/key/"+IFTTTKEY,
    method:'POST',
    headers: {
      "Content-Type":"application/json",
      "Content-Length":val.length
    }
  };

  http.request(opts, function(res) {
    var d = "";
    res.on('data', function(data) { d += data; });
    res.on('close', function() {
      console.log("msg: " + d);
      console.log("val: " + val);
    });
  }).end(val);
}

setWatch(function(){
  console.log("fire event!");
  var temp = {"value1":"23", "value2":"56"};
  sendEvent("button_pressed", temp);
}, BTN, {repeat:true, edge:'falling', debounce:30});