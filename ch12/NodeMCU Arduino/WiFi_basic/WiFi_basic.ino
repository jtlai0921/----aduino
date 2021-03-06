#include <ESP8266WiFi.h>
void setup() {
  Serial.begin(115200);
  WiFi.begin("WiFi網路SSID", "密碼");
  /*
   *  若要指定IP位址，請自行在此加入WiFi.config()敘述。
   WiFi.config(IPAddress(192,168,1,50),    // IP位址
               IPAddress(192,168,1,1),     // 閘道（gateway）位址
               IPAddress(255,255,255,0));  // 網路遮罩（netmask）
   */
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  Serial.println("");
  Serial.println("IP address: ");
  Serial.print(WiFi.localIP());
  Serial.println("WiFi status:");
  WiFi.printDiag(Serial);
}
void loop() {
}
