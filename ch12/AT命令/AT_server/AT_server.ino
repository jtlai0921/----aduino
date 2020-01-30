#include <SoftwareSerial.h>

SoftwareSerial ESP(3, 2);  // 接收腳, 傳送腳

void sendATcmd(String cmd, unsigned int time){
    String response = "";  // 接收ESP回應值的變數  
    ESP.print(cmd); // 送出AT命令到ESP模組
    unsigned long timeout = time + millis();
    
    while (ESP.available() || millis() < timeout) {
      while(ESP.available()) {
        char c = ESP.read(); // 接收ESP傳入的字元
        response += c;
      }
    }

    Serial.print(response);  // 顯示ESP的回應
}

void setup() {
  Serial.begin(9600);
  ESP.begin(9600); 
 
  sendATcmd("AT+RST\r\n",2000); // 重置ESP模組，等待2秒
  sendATcmd("AT+CWMODE=2\r\n",1000); // 設成AP模式，等待1秒
  sendATcmd("AT+CIFSR\r\n",1000); // 取得IP位址，等待1秒
  sendATcmd("AT+CIPMUX=1\r\n",1000); // 允許多重連線，等待1秒
  sendATcmd("AT+CIPSERVER=1,80\r\n",1000); // 在80埠啟動伺服器，等待1秒
}

void loop() { 
  if (ESP.available()) {
    if (ESP.find("+IPD,")) {  // 若接收到"+IPD,"，代表有用戶連線了…
        float x = analogRead(A0);  // 讀取A0類比值
        delay(100);
 
        byte connID = ESP.read()-48;  // 讀取連線編號（1~5）並轉成數字[建議這裡先說明最多 5 個連線]
        
        // 建立HTML內容
        String HTML = "<html><head><meta charset=\"utf-8\">";
        HTML+="<meta http-equiv=\"refresh\" content=\"10\">";
        HTML+="<title>物聯網實驗</title></head>";
        HTML+="<body><h1>Arduino類比數據</h1><p>A0類比腳：";
        HTML+= x;  // 顯示A0類比腳位值
        HTML+="</p></body></html>";
    
        // 建立AT+CIPSEND命令字串
        String cipSend = "AT+CIPSEND=";
        cipSend += connID;    // 附加連線編號
        cipSend += ",";
        cipSend +=HTML.length();  // 取得HTML內容的長度
        cipSend +="\r\n";
     
        sendATcmd(cipSend, 1000);  // 送出HTML內容
        sendATcmd(HTML, 1000);
     
        // 建立AT+CIPCLOSE命令字串
        String cipClose = "AT+CIPCLOSE=";
        cipClose+=connID;   // 附加連線編號
        cipClose+="\r\n";
        
        sendATcmd(cipClose,1000);  // 送出「中斷連線」命令
    }
  }
}
