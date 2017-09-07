const http = require('http');
const ecstatic =  require('ecstatic')({
  root: `${__dirname}/public`
});

http.createServer(ecstatic).listen(8080);

console.log('Listening on :8080');



