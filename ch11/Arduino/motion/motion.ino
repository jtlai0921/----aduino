#include <SoftwareSerial.h>   // 引用軟體序列埠程式庫
#include <Servo.h>          // 伺服馬達程式庫

// 定義連接藍牙模組的序列埠
SoftwareSerial BT(8, 9);  // 接收腳, 傳送腳
Servo servoX, servoY;    // 宣告兩個伺服馬達物件

char servo[2][4];  // 儲存序列字元資料的2×4二維陣列
byte i = 0;       // 二維陣列的索引值
byte j = 0;
int posX = 90;    // 伺服馬達的轉動值，預設為中間值。
int posY = 90;

void checkSerial() {
   char val;
  
   if (BT.available()) {
    val = BT.read();
    // 確認資料值介於'0'和'9'…
    if(val >= '0' && val <= '9') {
      servo[i][j] = val; // 存入陣列
      j ++;
    // 若遇到分隔字元…
    } else if (val == ',') {
      servo[i][j] = '\0';  // 插入字串結尾
      i++;    // 移到第二維陣列
      j = 0;  // 從頭開始存入
    // 若遇到結尾字元…
    } else if (val == '\n') {
      servo[i][j] = '\0';  // 插入字串結尾
      i = 0;
      j = 0;
      // 把兩個字串值轉成數字
      posX = atoi(servo[0]);
      posY = atoi(servo[1]);
    }
  } 
}

void setup() {
  servoX.attach(10);  // 設定伺服馬達的接腳
  servoY.attach(11);
  
  // 設定藍牙模組的連線速率
  BT.begin(9600);
}

void loop() {
  checkSerial();       // 不斷確認是否有新資料傳入的自訂函式
 
  servoX.write(posX);  // 控制伺服馬達
  servoY.write(posY);
}
