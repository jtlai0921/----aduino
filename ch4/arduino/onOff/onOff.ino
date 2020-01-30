const byte LED = 13;   // LED接在13腳
char val;         // 儲存接收資料的變數，採字元類型
void setup() {
  pinMode(LED, OUTPUT);  // 腳位設定成「輸出」模式

  Serial.begin(9600);
  Serial.println("Arduino ready.");  // 傳出訊息
}
 
void loop() {
  if( Serial.available() ) {  // 若序列埠收到字元…
    val = Serial.read();    // 讀入字元
    switch (val) {
    case '0' :            // 收若收到字元‘0’…
      digitalWrite(LED, LOW);   // 輸出低電位
      Serial.println("LED OFF");  // 傳出訊息
      break;
    case '1' :            // 收若收到字元‘1’…
      digitalWrite(LED, HIGH);   // 輸出高電位
      Serial.println("LED ON");
      break;
    }
  }
}
