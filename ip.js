const getIP = require("external-ip")();

getIP((err, ip) => {
  if (err) {
    throw err;
  }
  console.log(ip);
});
