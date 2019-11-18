const http = require('http');

const mountHtmlWithContent = content => `<html><head><title>Xesque</title></head><body>${content}</body></html>`;

const server = http.createServer((req, res) => {
    const { url, method } = req;

    res.setHeader('Content-Type', 'text/html');

    if (url === '/') {
        res.write(mountHtmlWithContent('<form action="/message"><input type="text" name="message"/><button type="submit" method="POST">Dale</button></form>'));
        return res.end();
    } else if (url === '/message' && method === 'POST') {
        console.log(res);
    }

    res.end();
});

server.listen(3000);