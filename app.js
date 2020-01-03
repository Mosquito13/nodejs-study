require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const MongoDbStore = require('connect-mongodb-session')(session);

const rootDir = require('./util/path');
const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const errorController = require('./controllers/error');

const { DB_STRING, SESSION_SECRET } = process.env;

const app = express();
const store = new MongoDbStore({
  uri: DB_STRING,
  collection: 'sessions'
});
const csrfProtection = csrf();

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.authenticated;
  res.locals.csrfToken = req.csrfToken();
  res.locals.errorMessage = req.flash('error');
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.getPageNotFound);

mongoose
  .connect(DB_STRING)
  .then(() => {
    app.listen(3000, () => console.log('Server listening on port 3000'));
  })
  .catch(err => console.log(err));
