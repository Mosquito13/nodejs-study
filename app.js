const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'main.html'));
});

app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'users.html'));
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
