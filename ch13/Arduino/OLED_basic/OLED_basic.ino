#include <Wire.h>
#include "ssd1306_i2c.h"
#include "font.h"

SSD1306 oled(0x3c, 0, 2); // I2C位址, SDA腳, SCL腳

void setup() {
  oled.init();
  oled.clear();
  oled.drawString(10, 20, "Hello!");
  oled.display();
}

void loop() {
  
}


