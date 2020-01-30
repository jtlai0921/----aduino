var dht = require("DHT11").connect(A8);

function temp() {  // 讀取DHT11數據的自訂函式
  dht.read(function (d) {
　　console.log("Temp: "+d.temp.toString()+", RH: "+d.rh.toString());
  });
}
setInterval(temp, 5000);   // 每5秒讀取DHT11數據