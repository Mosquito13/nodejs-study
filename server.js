const http = require('http');
const fs = require('fs');

const mountHtmlWithContent = content => `<html><head><title>Xesque</title></head><body>${content}</body></html>`;

const server = http.createServer((req, res) => {
    const { url, method } = req;

    res.setHeader('Content-Type', 'text/html');

    if (url === '/') {
        res.write(mountHtmlWithContent('<form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Dale</button></form>'));
        return res.end();
    } else if (url === '/message' && method === 'POST') {
        const requestBody = [];

        req.on('data', chunk => {
            requestBody.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(requestBody).toString();
            const message = parsedBody.split('=')[1];

            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');

                return res.end();
            });
        });
    }

    res.end();
});

server.listen(3000);