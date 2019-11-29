const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const userManager = require('./routes/user-manager');
const userRoutes = require('./routes/users');

const app = express();

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userManager.routes);
app.use(userRoutes);

app.use((req, res) => {
  res.status(404).render('page-not-found', {
    pageTitle: 'Page not found'
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});