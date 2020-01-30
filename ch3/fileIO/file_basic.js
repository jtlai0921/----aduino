var fs = require("fs");

fs.readFile("node.txt", "utf8", function(err, file) {
  if (err) {
   console.log("執行出錯了，訊息：" + err);
   process.exit();  // 中斷程序
  }
  console.log("檔案讀取完畢，內容：");
  process.stdout.write(file + '\n');
});

console.log("Node程式執行中…");