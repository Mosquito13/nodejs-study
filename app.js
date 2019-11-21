const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Xesque');
});

server.listen(3000, () => console.log('Server is ready on port 3000'));