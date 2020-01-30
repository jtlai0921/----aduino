var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
    res.write("Node網站開工了！");
    res.end();
});

server.listen(8080);
console.log("http伺服器已在8080埠口啟動");