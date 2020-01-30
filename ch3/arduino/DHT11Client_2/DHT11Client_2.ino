#include <SPI.h>
#include <Ethernet.h>
#include <dht11.h>
#include <Streaming.h>

dht11 DHT11;
const byte dataPin = 2;

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

// 要連接的伺服器IP位址
IPAddress server(192, 168, 1, 19);

// 本機的IP位址
IPAddress ip(192, 168, 1, 177);

// 初始化乙太用戶端
EthernetClient client;
unsigned long past = 0; 
const unsigned long interval = 5 * 1000L;

void setup() {
  Serial.begin(9600);

  Ethernet.begin(mac, ip);  // 初始化乙太網路連線
  
  // 等待一秒鐘，讓乙太網路卡有時間進行初始化
  delay(1000);
  Serial.println("connecting...");
}

void loop() {
 if (millis() - past > interval) {
   int chk = DHT11.read(dataPin);
   
   if (chk == 0) {
     httpSend();
   } else {
     Serial.println("Sensor Error");
   }
  }
}

void httpSend() {
  char tBuffer[6] = "";
  char hBuffer[6] = "";
  client.stop();

  // 連線到指定伺服器的5438埠號
  if (client.connect(server, 5438)) {
    Serial.println("connected");
    // 發送HTTP請求
    client << "GET /th?t=" << dtostrf(DHT11.temperature, 5, 2, tBuffer)
           << "&h=" << dtostrf(DHT11.humidity, 5, 2, hBuffer)
           << " HTTP/1.1\n";
    client.println();

    past = millis();
  } else {
    Serial.println("connection failed");
  }
}
