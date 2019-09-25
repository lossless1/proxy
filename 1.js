var express = require("express");
var app = express();
var httpProxy = require("http-proxy");
var apiProxy = httpProxy.createProxyServer();
var serverOne = "http://51.158.99.51:8811",
  ServerTwo = "http://localhost:3002",
  ServerThree = "http://localhost:3002";

app.all("*", function(req, res) {
  console.log("redirecting to Server1");
	console.log(req.headers);
	req.headers = 
  // apiProxy.web(req, res, { target: serverOne });
});

app.all("/app2/*", function(req, res) {
  console.log("redirecting to Server2");
  apiProxy.web(req, res, { target: ServerTwo });
});

app.all("/app3/*", function(req, res) {
  console.log("redirecting to Server3");
  apiProxy.web(req, res, { target: ServerThree });
});

app.listen(3003);
console.log("Server listen on 3003 port");
