#include "SPI.h"
#include "Ethernet.h"
#include "WebServer.h"
#include "Streaming.h"

const byte LED_PIN = 8;
static byte mac[] = { 0xF0, 0x7B, 0xCB, 0x4B, 0x7C, 0x9F };
IPAddress ip(192, 168, 1, 25);
IPAddress subnet(255, 255, 255, 0);
IPAddress gateway(192, 168, 1, 1);

WebServer webserver("", 80);

byte ledPin = 3;  // 預設是第一個PWM腳位 
int pwm = 0;
int swVal = 0;

// 確認資料是否在陣列裡面
boolean isPWMpin(byte pin){
    byte pins[] = {3, 5, 6, 9, 10, 11};
    for (byte i=0; i < 6; i++) {
        if (pins[i] == pin) {
            return true;
        }
    }
    return false;
}

P(htmlHead) =
 "<!doctype html><html>"
 "<head><meta charset=\"utf-8\">"
 "<title>Arduino 微網站</title>"
 "</head><body>" ;
 
P(htmlFoot) = "</body></html>";

P(homePage) = "這是微網站的首頁。";

void defaultCmd(WebServer &server, WebServer::ConnectionType type, char *, bool)
{
  server.httpSuccess();
  
  if (type != WebServer::HEAD) 
  {
    server.printP(htmlHead);
    server.printP(homePage);
    server.printP(htmlFoot);
  }
}

void pwmCmd(WebServer &server, WebServer::ConnectionType type, char *url_tail, bool tail_complete)
{
  URLPARAM_RESULT rc;
  char name[16];
  char value[32];

  server.httpSuccess("application/json");  // 設定正確的內容類型

  if (type == WebServer::GET){
    while (strlen(url_tail))
    {
      rc = server.nextURLparam(&url_tail, name, 16, value, 16);
      
      if (rc != URLPARAM_EOS)
      {
       if (strcmp(name, "pin") == 0) {
          ledPin = atoi(value);
          Serial.print("pin: ");
          Serial.println(ledPin);
          // 確認是否是PWM控制腳位
          if (!isPWMpin(ledPin)) {
            ledPin = 3;
          } else {
            pinMode(ledPin, OUTPUT);
          }
        }
  
        if (strcmp(name, "pwm") == 0) {
          pwm = atoi(value);
          if (pwm > 255) pwm = 255;
          Serial.print("pwm: ");
          Serial.println(pwm);
          
          if (ledPin != 255) {  // 只要led腳位編號不是255…
             analogWrite(ledPin, pwm);   // 輸出PWM訊號
   	}
        } 
      }
    }
  }
  
  server << "{\"pin\":" << ledPin << ",\"pwm\":" << pwm << "}";
}

void swCmd(WebServer &server, WebServer::ConnectionType type, char *url_tail, bool tail_complete)
{
  URLPARAM_RESULT rc;
  char name[16];
  char value[32];

  server.httpSuccess("application/json");  // 設定正確的內容類型

  if (type == WebServer::GET){
    while (strlen(url_tail))
    {
      rc = server.nextURLparam(&url_tail, name, 16, value, 16);
      
      if (rc != URLPARAM_EOS)
      {
       if (strcmp(name, "pin") == 0) {
          ledPin = atoi(value);
          Serial.print("pin: ");
          Serial.println(ledPin);
          
          pinMode(ledPin, OUTPUT);
        }
  
        if (strcmp(name, "sw") == 0) {
          Serial.print("sw: ");
          swVal = atoi(value);
          Serial.println(swVal);
          
         if (swVal == 1) {
            digitalWrite(ledPin, HIGH);
          } else {
            digitalWrite(ledPin, LOW);
          }
        } 
      }
    }
  }
  
  server << "{\"pin\":" << ledPin << ",\"sw\":" << swVal << "}";
}

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
  Ethernet.begin(mac, ip, gateway, subnet);
  webserver.setDefaultCommand(&defaultCmd);     // 處理「首頁」請求
  webserver.addCommand("pwm", &pwmCmd);         // 處理pwm請求
  webserver.addCommand("sw", &swCmd);         // 處理pwm請求
  webserver.begin();
  Serial.println("online...");
}

void loop() {
  char buff[96];
  int len = 96;

  webserver.processConnection(buff, &len);
}
