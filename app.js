const express = require('express');

const app = express();

// app.use((req, res, next) => {
//     console.log('first');
//     next();
// });

// app.use((req, res, next) => {
//     console.log('second');
//     next();
// });

app.use('/users', (req, res) => {
    console.log('/users');
    res.send('Navigated to /users');
});

app.use('/', (req, res) => {
    console.log('/');
    res.send('Navigated to /');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});