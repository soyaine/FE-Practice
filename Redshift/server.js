const http = require('http');

const hostname0 = 'localhost';
const hostname1 = '127.0.0.1';

const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname0, () => {
  console.log(`Server running at http://${hostname0}:${port}/`);
});

//server.listen(port, hostname1, () => {
//  console.log(`Server running at http://${hostname1}:${port}/`);
//});