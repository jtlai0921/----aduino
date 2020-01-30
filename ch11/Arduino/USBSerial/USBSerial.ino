const byte CDS_PIN = A0;
const byte LED_PIN = 13;

int interval = 1000;  // 間隔時間1000ms
unsigned long preMillis = 0; // 紀錄前次間隔時間

void setup() {
    Serial.begin(9600);
    pinMode(CDS_PIN, INPUT);
    pinMode(LED_PIN, OUTPUT);
}

void loop() {
   if (Serial.available() > 0) {
     char val = Serial.read();  // 讀取
       switch (val) {
        case '0':
          digitalWrite(LED_PIN, LOW);
          break;
        case '1':
          digitalWrite(LED_PIN, HIGH);
          break;
      }
   }
    // 每隔一段時間（1000ms）
    if (millis() - preMillis >= interval) {
        int value = analogRead(CDS_PIN);
        Serial.println(value);  // 從序列埠發出類比資料（以‘\n’結尾）
        preMillis = millis();
    }
}
