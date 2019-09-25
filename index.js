var http = require("http"),
  connect = require("connect"),
  request = require("request"),
  colors = require("colors"),
  util = require("util"),
  queryString = require("querystring"),
  bodyParser = require("body-parser"),
  httpProxy = require("http-proxy"),
  proxy = httpProxy.createProxyServer({});

//restream parsed body before proxying
proxy.on("proxyReq", async function(proxyReq, req, res, options) {
  // proxyReq.setHeader("Content-Type", "application/json");
  // proxyReq.setHeader("CustomHeader", "123123123");
  console.log("Change headers");
  // if (!req.body || !Object.keys(req.body).length) {
  //   return
  // }
  // var contentType = proxyReq.getHeader('Content-Type')
  // var bodyData

  // if (contentType === 'application/json') {
  //   bodyData = JSON.stringify(req.body)
  // }

  // if (contentType === 'application/x-www-form-urlencoded') {
  //   bodyData = queryString.stringify(req.body)
  // }

  // if (bodyData) {
  //   proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
  //   proxyReq.write(bodyData)
  // }
});

//
//  Basic Http Proxy Server
//
var app = connect()
  .use(bodyParser.json()) //json parser
  .use(bodyParser.urlencoded()) //urlencoded parser
  .use(function(req, res) {
    console.log("proxy body:", req.headers);
    proxy.web(req, res, {
      target: {
        host: "167.71.199.231",
        port: 3128
      }
      // forward: "http://google.com"
      // xfwd: true,
      // ignorePath: true,
      // changeOrigin: true
      // followRedirects: true
      // localAddress: true
      // target: "http://localhost:9013"
    });
  });

http.createServer(app).listen(8013, function() {
  console.log("proxy listen 8013");
});

//
//  Target Http Server
//
var app1 = connect()
  .use(bodyParser.json())
  .use(function(req, res) {
    console.log("app1:", req.headers);

    res.end("request successfully proxied to: " + req.url + "\n");
  });
http.createServer(app1).listen(9013, function() {
  console.log("http listen 9013");
});
