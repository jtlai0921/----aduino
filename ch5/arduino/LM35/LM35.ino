const byte LM35 = A0;  // LM35溫度感測器接在A0腳

void setup() {
  Serial.begin(9600);
}

void loop() {
  int val;
  int temp;

  val = analogRead(LM35); // 讀取並暫存感測器的類比值
  temp = val * 0.488;

  Serial.print("Temp:");
  Serial.print(temp);        // 在序列埠監控視窗顯示溫度值
  Serial.println("C");

  delay(3000);    // 暫停3秒
}
