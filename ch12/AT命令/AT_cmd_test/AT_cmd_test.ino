#include <SoftwareSerial.h>   // 引用程式庫

SoftwareSerial ESP(3, 2); // 接收腳, 傳送腳

void setup() {
  Serial.begin(9600);  // 與電腦序列埠連線，也能改成115200
  ESP.begin(9600);   // 與ESP-01模組連線或採用115200
  Serial.println("Serial is ready!");
  Serial.println("");
}
 
void loop() {
  // 若收到「序列埠監控視窗」的資料，則送到ESP-01模組。
  if (Serial.available()) {
    ESP.print(Serial.read());
  }
 
  // 若收到ESP-01模組的資料，則送到「序列埠監控視窗」。
  if (ESP.available()) {
    Serial.print(ESP.read());
  }
}
