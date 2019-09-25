var http = require("http"),
  httpProxy = require("http-proxy"),
  proxy = httpProxy.createProxyServer({});

proxy.on("proxyReq", (proxyReq, req) => {
  // proxyReq.setHeader("Host", `http://94.177.245.130:8080`);
  proxyReq.setHeader("Host", `github.com`);
  // proxyReq.setHeader("x-forwarded-host", `http://github.com`);
  // proxyReq.setHeader("x-forwarded-port", `80`);
  // proxyReq.setHeader("x-forwarded-proto", `http`);
  // proxyReq.setHeader("Protocol", `http`);
  console.log(proxyReq.getHeaderNames());
});

const server = http
  .createServer((req, res) => {
    proxy.web(req, res, {
      target: {
        protocol: "http",
        host: "94.177.245.130",
        port: 8080
      }
      // forward: "http://github.com"
      // changeOrigin: true
    });
  })
  .listen(8013, function() {
    console.log("proxy listen 8013");
  });

// var app = connect()
//   .use(bodyParser.json()) //json parser
//   .use(bodyParser.urlencoded()) //urlencoded parser
//   .use(function(req, res) {
//     console.log("proxy body:", req.headers);
//     proxy.web(req, res, {
//       target: {
//         host: "167.71.199.231",
//         port: 3128
//       }
//       // forward: "http://google.com"
//       // xfwd: true,
//       // ignorePath: true,
//       // changeOrigin: true
//       // followRedirects: true
//       // localAddress: true
//       // target: "http://localhost:9013"
//     });
//   });

// http.createServer(app).listen(8013, function() {
//   console.log("proxy listen 8013");
// });
