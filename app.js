const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const expressHandlebars = require('express-handlebars'); // handlebars templating

const rootDir = require('./util/path');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// app.engine('handlebars', expressHandlebars({ defaultLayout: 'main-layout' })); // handlebars templating
// app.set('view engine', 'handlebars'); // handlebars templating
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).render('page-not-found', {
    pageTitle: 'Page not found',
    routePath: 'notFound'
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
