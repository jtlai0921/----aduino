#include <SPI.h>
#include <Ethernet.h>

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

// 要連接的Node伺服器IP位址
IPAddress server(192, 168, 1, 19);

// 本機的IP位址
IPAddress ip(192, 168, 1, 177);

// 初始化乙太用戶端
EthernetClient client;

void setup() {
  Serial.begin(9600);

  Ethernet.begin(mac, ip);  // 初始化乙太網路連線
  
  // 等待一秒鐘，讓乙太網路卡有時間進行初始化
  delay(1000);
  Serial.println("connecting...");
  
  // 連線到指定伺服器的5438埠號
  if (client.connect(server, 5438)) {
    Serial.println("connected");
    // 發送HTTP請求
    client.println("GET /a?pin=10&state=1 HTTP/1.1");
    client.println();
  } else {
    // if you couldn't make a connection:
    Serial.println("connection failed");
  }
}

void loop() {

}
