// 動手做16-1：監控遠端的溫濕度值，輸出小數點。
// 詳細的程式說明，請參閱「超圖解Arduino互動設計入門」第十六章。

#include "SPI.h"
#include "Ethernet.h"
#include "WebServer.h"
#include "Streaming.h"   // 引用處理字串的程式庫（參閱下文說明）
#include "dht11.h"

dht11 DHT11;            // 宣告 DHT11 程式物件
const byte dataPin = 2; // 宣告 DHT11 模組的資料輸入腳位

static byte mac[] = { 0xF0, 0x7B, 0xCB, 0x4B, 0x7C, 0x9F };
IPAddress ip(192, 168, 1, 25);
IPAddress subnet(255, 255, 255, 0);
IPAddress gateway(192, 168, 1, 1);

WebServer webserver("", 80);

P(htmlHead) =
 "<!doctype html><html>"
 "<head><meta charset=\"utf-8\">"
 "      <meta http-equiv=\"refresh\" content=\"3\">"
 "<title>Arduino 溫濕度計</title>"
 "</head><body>";
 
P(htmlFoot) = "</body></html>";

void defaultCmd(WebServer &server, WebServer::ConnectionType type, char *, bool)
{
  int chk = DHT11.read(dataPin);
  char buffer[5] = "";
  server.httpSuccess();

  if (type != WebServer::HEAD){
    server.printP(htmlHead);

    if (chk == 0) {
      server << "<h1>溫濕度計</h1>";
      server << "<p>溫度：" << dtostrf(DHT11.temperature, 5, 2, buffer)
             << "&deg;C</p>";
      server << "<p>濕度：" << dtostrf(DHT11.humidity, 5, 2, buffer) 
             << "%</p>";
    } else {
      server << "<h1>無法讀取溫濕度值</h1>";
    }
    server.printP(htmlFoot);
  }
}

void dht11Cmd(WebServer &server, WebServer::ConnectionType type, char *, bool)
{
  int chk = DHT11.read(dataPin);
  char buffer[5] = "";
  server.httpSuccess("text/plain");  // 設定回傳「純文字」內容類型
  
  if (type != WebServer::HEAD) {
    if (chk == 0) {
      server << dtostrf(DHT11.temperature, 5, 2, buffer);
    } else {
      server << "??";
    }
  }
}

void thCmd(WebServer &server, WebServer::ConnectionType type, char *, bool)
{
  int chk = DHT11.read(dataPin);
  char buffer[5] = "";
  server.httpSuccess("text/javascript");
  
  if (type != WebServer::HEAD) {
    if (chk == 0) {
      server << "{\"t\":" << dtostrf(DHT11.temperature, 5, 2, buffer) 
             << ",\"h\":" << dtostrf(DHT11.humidity, 5, 2, buffer) 
             << "}";
    } else {
      server << "{\"t\":\"?\",\"h\":\"?\"}";
    }
  }
}

boolean isPWMpin(byte pin) {
    byte pins[] = {3, 5, 6, 9}; 
    for (byte i=0; i < 4; i++) {
        if (pins[i] == pin) {
            return true;
        }
    }
    return false;
}

void getCmd(WebServer &server, WebServer::ConnectionType type, char *url_tail, bool tail_complete) {
  URLPARAM_RESULT rc;
  char name[16];
  char value[16];
  byte ledPin = 255;
  byte pwm = 0;

  server.httpSuccess("application/json");  // 內容類型設定成JSON

  if (type == WebServer::GET) {  // 處理GET請求
    while (strlen(url_tail)) {
      rc = server.nextURLparam(&url_tail, name, 16, value, 16);
      
      if (rc != URLPARAM_EOS) {
       if (strcmp(name, "led") == 0) {  // 讀取led參數
          ledPin = atoi(value);       // 將資料轉換成數字類型
          
          if (!isPWMpin(ledPin)) {   // 確認是否為PWM控制腳位
            ledPin = 255;        // 若不是，則設定成（不存在的）255腳
          } else {
            pinMode(ledPin, OUTPUT);  // 若是，則把該腳設成「輸出」模式。
          }
        }
  
        if (strcmp(name, "pwm") == 0) {  // 讀取pwm參數
          pwm = atoi(value);      // 將資料轉換成數字類型
          if (pwm > 255) pwm = 255;   // 確認數值不超過255

          if (ledPin != 255) {  // 只要led腳位編號不是255…
             analogWrite(ledPin, pwm);   // 輸出PWM訊號
         }
        } 
      }
    }
  }
  // 輸出JSON格式訊息
  server << "{\"pin\":" << ledPin << ",\"pwm\":" << pwm << "}";
}

void setup() {  
  Ethernet.begin(mac, ip, gateway, subnet);
  webserver.setDefaultCommand(&defaultCmd);   // 處理「首頁」請求
  webserver.addCommand("temp", &dht11Cmd);
  webserver.addCommand("th.json", &thCmd);
  webserver.addCommand("pwm", &getCmd);    // 處理「pwm頁面」請求
  webserver.begin();
}

void loop() {
  webserver.processConnection();
}
