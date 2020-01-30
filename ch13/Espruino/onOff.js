// 本程式僅適用於DHCP（動態分配IP）環境
var wifi = require("Wifi");
var ssid = "你的網路SSID";
var pass = "你的網路密碼";
var netInfo;

var htmlHead = '<!doctype html><html><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' + 
    '<title>Espruino IoT</title></head><body>';

var htmlFoot = '</body></html>';

var LED = D2;

function startServer() {
  require("http").createServer(onHttpReq).listen(80);
}

function onHttpReq(req, res) {
  var q = url.parse(req.url, true);
  res.writeHead(200, {'Content-Type': 'text/html'});
 
  if (q.pathname == "/sw") {
    res.write(htmlHead);
    if (q.query.led == 'on') {
      digitalWrite(LED, 0); 
      res.write("<p>LED is ON</p>");
    } else {
      digitalWrite(LED, 1);
      res.write("<p>LED is OFF</p>");
    }
  } else {
    res.write(htmlHead);
    res.write("<h1>Espruino IoT Home.</h1>");
  }
  res.end(htmlFoot);
}

wifi.connect(ssid, {"password":pass},
     function(err){ 
        if (err === null) {
           netInfo = wifi.getIP();
           console.log("Net info: ", netInfo);
           console.log("IP: " + netInfo.ip);

          startServer();
          wifi.getStatus(function(e) {
            console.log("Status: ", e);
          });
          
        } else {
           console.log("Connect ERROR: " + err);
        }
      }
);