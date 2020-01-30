#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <Wire.h>
#include "ssd1306_i2c.h"
#include "font.h"
#include <dht11.h>

#define DHT11PIN 5

const char ssid[] = "你的WiFi網路SSID";
const char pass[] = "你的WiFi密碼";

String ipStr;

ESP8266WebServer server(80);
String webString="";     // 暫存要顯示在網頁的文字

SSD1306 oled(0x3c, 0, 2); // I2C位址, SDA腳, SCL腳

dht11 DHT11;

float temp;
float hum;

unsigned long previousMillis = 0;
const long interval = 2000;  // 2秒

void handle_root() {
  server.send(200, "text/html", "Hello from <b>ESP8266</b>!");
}

void displayData(float t, float h) {
  char charTemp[6];
  char charHum[6];

  dtostrf(t, 5, 2, charTemp);
  dtostrf(h, 5, 2, charHum);

  oled.clear();
  oled.setFontScale2x2(false);
  oled.drawString(0, 0, ipStr);
  oled.setFontScale2x2(true);
  oled.drawXbm(0, 18, 32, 16, temperature);
  oled.drawXbm(0, 38, 32, 16, humidity);
  oled.drawString(34, 19, charTemp);
  oled.drawXbm(114, 18, 16, 16, degree);
  oled.drawString(34, 39, charHum);
  oled.drawString(114, 39, "%");
  oled.display();
}

void drawSpinner(int count, int active) {
  for (int i = 0; i < count; i++) {
    const char *xbm;
    if (active == i) {
       xbm = active_bits;
    } else {
       xbm = inactive_bits;
    }
    oled.drawXbm(64 - (12 * count / 2) + 12 * i, 0, 8, 8, xbm);
  }
}

void readDHT11() {
  unsigned long currentMillis = millis();

  if(currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    int chk = DHT11.read(DHT11PIN);
    Serial.print("Read sensor: ");
    switch (chk)
    {
      case 0: 
        Serial.println("OK");
        temp = DHT11.temperature;
        hum = DHT11.humidity;
        
        displayData(temp, hum);
        break;
      case -1: Serial.println("Checksum error"); break;
      case -2: Serial.println("Time out error"); break;
      default: Serial.println("Unknown error"); break;
    }
  }
}

void setup() {
  pinMode(0, INPUT_PULLUP);
  pinMode(2, INPUT_PULLUP);
  pinMode(DHT11PIN, INPUT);

  Serial.begin(115200);

  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);
  /*
   *  若要指定IP位址，請自行在此加入WiFi.config()敘述。
   WiFi.config(IPAddress(192,168,1,50),    // IP位址
               IPAddress(192,168,1,1),     // 閘道（gateway）位址
               IPAddress(255,255,255,0));  // 網路遮罩（netmask）
   */

  oled.init();

  int counter = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    oled.clear();
    oled.drawXbm(34, 18, 60, 36, WiFi_Logo_bits);
    drawSpinner(3, counter % 3);
    oled.display();
    counter++;
  }
  Serial.println("");

  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  Serial.println("Server started");

  oled.clear();
  IPAddress ip = WiFi.localIP(); 
  ipStr = "IP:" + String(ip[0]) + '.' + String(ip[1]) + '.' + String(ip[2]) + '.' + String(ip[3]);
  oled.setFontScale2x2(false);
  oled.drawString(0, 0, ipStr);
  oled.display();

  server.on("/", handle_root);
  
  server.onNotFound([](){   // 處理「找不到指定路徑」的事件
    server.send(404, "text/plain", "File NOT found!");
  });
  
  server.on("/temp", [](){
    webString="Temperature: "+String(temp)+" C";
    server.send(200, "text/plain", webString);
  });
 
  server.on("/humid", [](){
    webString="Humidity: "+String(hum)+"%";
    server.send(200, "text/plain", webString);
  });

  server.on("/th.json", [](){
    String str="{\"t\":" + String(temp) + ",\"h\":" + String(hum) + "}";
    server.send(200, "text/javascript", str);
  });
  
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
    server.handleClient();
    readDHT11();
}


