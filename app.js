const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

const rootDir = require('./util/path');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');
// app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).render('page-not-found', {
    pageTitle: 'Page not found'
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
