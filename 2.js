var http = require("http"),
  httpProxy = require("http-proxy");

const getIP = require("external-ip")();

//
// Create a proxy server with custom application logic
//
httpProxy
  .createServer(function(req, res, proxy) {
    //
    // Put your custom server logic here
    //
    req.headers = {
      ...req.headers,
      Forward: "github.com:80"
    };
    getIP((err, ip) => {
      if (err) {
        throw err;
      }
      console.log(ip);
    });

    proxy.proxyRequest(req, res, {
      host: "http://github.com",
      port: 80
    });
  })
  .listen(8000);

http
  .createServer(function(req, res) {
    getIP((err, ip) => {
      if (err) {
        throw err;
      }
      console.log(ip);
    });
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write(
      "request successfully proxied: " +
        req.url +
        "\n" +
        JSON.stringify(req.headers, true, 2)
    );
    res.end();
  })
  .listen(9000);
