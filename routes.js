const fs = require('fs');

const requestHandler = (req, res) => {
    const { url, method } = req;
    
    if (url === '/') {
        res.write('<html><body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Dale</button></form></body></html>');
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

    res.setHeader('Content-Type', 'text/html');
    res.end();
};

exports = requestHandler;