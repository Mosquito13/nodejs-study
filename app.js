require('dotenv').config();

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./util/path');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.getPageNotFound);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  //.sync({ force: true }) // Drops all before sync
  .sync()
  .then(() => User.findByPk(1))
  .then(user => {
    if (!user) {
      User.create({ name: 'Mosquito', email: 'mosquito@bzz.co' });
    }
  })
  .then(() =>
    app.listen(3000, () => console.log('Server listening on port 3000'))
  )
  .catch(err => console.log(err));
