const http = require('http');
const ecstatic =  require('ecstatic')({
  root: `${__dirname}/public`
});

http.createServer(ecstatic).listen(process.env.PORT);

console.log('Listening on :', process.env.PORT);



