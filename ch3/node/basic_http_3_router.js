require('http').createServer(function(req, res) {
  switch (req.url) {	// 判讀請求連線路徑
    case "/":		// 若是根路徑
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end("歡迎光臨！");
      break;
    case "/blog":	// 若是/blog路徑
      res.writeHead(200, {"Content-Type":"text/html"});
      res.end("這是網誌。");
      break;
    default:		// 若是其他路徑
      res.writeHead(404, {"Content-Type":"text/html"});
      res.end("找不到資源！");
  }
}).listen(8080);
console.log("http伺服器已在8080埠口啟動");