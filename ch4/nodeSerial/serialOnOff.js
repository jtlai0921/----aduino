var stdin = process.stdin;
// stdin.setEncoding( 'utf8' );

var com = require("serialport");
var serialPort = new com.SerialPort("COM4");

serialPort.on("open", function(error){
  process.stdout.write('請輸入on或off開、關燈。\n');
  
  serialPort.on("data", function(d){
      console.log("Arduino回應：" + d);             // 顯示傳入序列埠的資料
  });
  
  stdin.on( 'data', function( key ){
    var str = key.toString().toLowerCase().trim();
    
    if ( str == 'on' ) {
      //process.stdout.write( '開燈\n');
      serialPort.write('1');
    }
    
    if ( str == 'off' ) {
      //process.stdout.write( '關燈\n');
      serialPort.write('0');
    }
  })
});