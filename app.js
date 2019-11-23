const express = require('express');

const app = express();

app.use('/', (req, res) => {
    console.log('navigated to /');
    res.send('Ok');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});