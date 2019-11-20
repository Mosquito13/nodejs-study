const wrapHtml = content => `<html><body>${content}</body></html>`;

const requestHandler = (req, res) => {
    const { url, method } = req;

    res.setHeader('Content-Type', 'text/html');

    if (url === '/') {
        res.write(wrapHtml('Hello my dear!<br/><form action="/create-user" method="POST"><input name="username" placeholder="User name"/><button type="submit">Add</button></form>'));
    } else if (url === '/users') {
        res.write(wrapHtml('<ul><li>User 1</li><li>User 2</li></ul>'));
    } else if (url === '/create-user' && method === 'POST') {
        const requestBody = [];

        req.on('data', chunk => {
            requestBody.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(requestBody).toString();
            const user = parsedBody.split('=')[1];

            console.log('User', user);

            res.statusCode = 302;
            res.setHeader('Location', '/');

            return res.end();
        });
    } else {
        res.statusCode = 404; 
    }

    res.end();
};

module.exports = requestHandler;