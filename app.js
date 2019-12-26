require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const rootDir = require('./util/path');
const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const errorController = require('./controllers/error');

const app = express();

const { DB_STRING } = process.env;

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
  User.findById('5df97f96dbd5c92288b4fed0')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.getPageNotFound);

mongoose
  .connect(DB_STRING)
  .then(() => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Mosquito',
          email: 'mosquito@bresque.co',
          cart: {
            items: []
          }
        });

        user.save();
      }
    })
    app.listen(3000, () => console.log('Server listening on port 3000'));
  })
  .catch(err => console.log(err));
