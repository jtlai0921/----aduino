#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <ESP8266HTTPUpdateServer.h>
#include <ESP8266HTTPClient.h>

const char* host = "jarvis";
const char* ssid = "你的Wi-Fi網路SSID";
const char* password = "Wi-Fi密碼";

ESP8266WebServer httpServer(80);
ESP8266HTTPUpdateServer httpUpdater;

// 自訂的IFTTT相關程式
const byte BTN_PIN = 0;
const byte LED_PIN = 2;

unsigned long previousMillis = 0;
const long interval = 60000;

HTTPClient http;

void handle_root() {
  httpServer.send(200, "text/text", "Hello from the esp8266.");
}

void IFTTT() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(BTN_PIN, INPUT_PULLUP);    
   
  http.begin("maker.ifttt.com", 80, "/trigger/button_pressed/with/key/你的鍵碼");
  http.addHeader("Content-Type", "application/json");
   
  int httpCode = http.POST("{\"value1\":12, \"value2\":34}");  // 虛構的溫溼度值
  if(httpCode > 0) {
    Serial.printf("HTTP code: %d\n", httpCode);
    
    if(httpCode == 200) {
      String payload = http.getString();
      Serial.println(payload);
    } else {
        Serial.println("HTTP connection ERROR!");
    }
  }
}

void setup(void){
  Serial.begin(115200);
  Serial.println();
  Serial.println("Booting Sketch...");
  
  WiFi.begin(ssid, password);
  /*
  // 若要使用固定IP，請加入底下的WiFi.config()敘述
  WiFi.config( IPAddress(192,168,1,50),    // IP位址
               IPAddress(192,168,1,1),     // 閘道（gateway）位址
               IPAddress(255,255,255,0) );  // 網路遮罩（netmask）
  */      
  while(WiFi.waitForConnectResult() != WL_CONNECTED){
    WiFi.begin(ssid, password);
      /*
      // 若要使用固定IP，請加入底下的WiFi.config()敘述
      WiFi.config( IPAddress(192,168,1,50),    // IP位址
                  IPAddress(192,168,1,1),     // 閘道（gateway）位址
                  IPAddress(255,255,255,0) );  // 網路遮罩（netmask）
      */ 
          
    Serial.println("WiFi failed, retrying.");  // 無法連上Wi-Fi
  }
  httpServer.on("/", handle_root);   // 處理首頁的連線請求
  httpServer.on("/index.html", handle_root);
  
  MDNS.begin(host);

  httpUpdater.setup(&httpServer);
  httpServer.begin();
  
  MDNS.addService("http", "tcp", 80);
  MDNS.setInstanceName("Cubie's ESP8266");
  Serial.printf("HTTPUpdateServer ready! Open http://%s.local/update in your browser\n", host);
}

void loop(void){
  httpServer.handleClient();

  unsigned long currentMillis = millis();
    boolean btnState= digitalRead(BTN_PIN);
    
    if (btnState == LOW) {
      digitalWrite(LED_PIN, LOW);   // 點亮LED
      if ((previousMillis == 0) || (currentMillis - previousMillis) >= interval) {
        previousMillis = currentMillis;
        IFTTT();
      }
    } else {
      digitalWrite(LED_PIN, HIGH);  // 關閉LED
    }
}
