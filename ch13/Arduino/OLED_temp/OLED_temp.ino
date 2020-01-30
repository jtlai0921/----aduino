#include <Wire.h>
#include "ssd1306_i2c.h"
#include "font.h"

String ipStr = "IP:192.168.1.18";

SSD1306 oled(0x3c, 0, 2); // I2C位址, SDA腳, SCL腳

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

void setup() {
  oled.init();  // 初始化顯示器
  displayData(23.45, 67.89);  // 顯示溫濕度
}

void loop() {
  
}


