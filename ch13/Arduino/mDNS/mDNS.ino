#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h> 
 
const char ssid[] = "你的WiFi網路SSID";
const char pass[] = "你的WiFi密碼";
 
ESP8266WebServer server(80);
 
void handle_root() {
  server.send(200, "text/text", "Hello from the esp8266.");
}
 
void setup(void) {
  Serial.begin(115200);  
  WiFi.begin(ssid, pass);
  /*
   *  若要指定IP位址，請自行在此加入WiFi.config()敘述。
   WiFi.config(IPAddress(192,168,1,50),    // IP位址
               IPAddress(192,168,1,1),     // 閘道（gateway）位址
               IPAddress(255,255,255,0));  // 網路遮罩（netmask）
   */

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  IPAddress ip = WiFi.localIP();
  
  if (!MDNS.begin("jarvis", ip)) {
    Serial.println("Error setting up MDNS responder!");
    while(1) { 
      delay(1000);
    }
  }
  Serial.println("mDNS responder started");
  
  server.on("/", handle_root);
  server.on("/index.html", handle_root);  
  server.begin();
  Serial.println("HTTP server started");

  MDNS.setInstanceName("Cubie's ESP8266");
  MDNS.addService("http", "tcp", 80);
}
 
void loop() {
  server.handleClient();
} 
