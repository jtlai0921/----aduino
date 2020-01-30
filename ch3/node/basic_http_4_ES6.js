const http = require('http');
const hostname = '127.0.0.1';  // 主機IP位址
const port = 1337;             // 埠號

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port, hostname, () => {
  console.log(`網站在此位址啟動了：http://${hostname}:${port}/`);
});