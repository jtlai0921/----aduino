#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "你的WiFi網路SSID";
const char* pass = "你的WiFi密碼";

const byte BTN_PIN = 0;     // 按鈕/開關接腳
const byte LED_PIN = 2;     // LED接腳

unsigned long previousMillis = 0;
const long interval = 60000;     // 60秒

HTTPClient http;

void IFTTT() {
    http.begin("maker.ifttt.com", 80, "/trigger/button_pressed/with/key/你的鍵碼");
    http.addHeader("Content-Type", "application/json");
    
    // 設置要傳送的JSON資料
    int httpCode = http.POST("{\"value1\":22, \"value2\":56}");
    //int httpCode = http.GET();
    if(httpCode > 0) {
        // 在序列埠監控視窗顯示送出的數據
        Serial.printf("HTTP code: %d\n", httpCode);
        
        if(httpCode == 200) {
          String payload = http.getString();
          // 顯示遠端伺服器的回應
          Serial.println(payload);
        }
    } else {
        Serial.println("HTTP connection ERROR!");
    }
}

void setup() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(BTN_PIN, INPUT_PULLUP);  // 啟用上拉電阻
  
  Serial.begin(115200);
  WiFi.begin(ssid, pass);
  /*
   *  若要指定IP位址，請自行在此加入WiFi.config()敘述。
   WiFi.config(IPAddress(192,168,1,50),    // IP位址
               IPAddress(192,168,1,1),     // 閘道（gateway）位址
               IPAddress(255,255,255,0));  // 網路遮罩（netmask）
   */
   
  Serial.println("");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Wi-Fi ready...");
}

void loop() {
    unsigned long currentMillis = millis();
    boolean btnState= digitalRead(BTN_PIN);
    
    if (btnState == LOW) {
      // 點亮LED
      digitalWrite(LED_PIN, LOW);
      if ((previousMillis == 0) || (currentMillis - previousMillis) >= interval) {
        previousMillis = currentMillis;
        IFTTT();
      }
    } else {
      // 關閉LED
      digitalWrite(LED_PIN, HIGH);
    }
 }