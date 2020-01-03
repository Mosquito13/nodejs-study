const User = require('../models/user');
const bcrypt = require('bcryptjs');

const { BCRYPT_SALT } = process.env;

exports.getLogin = (req, res) => {
  res.render('auth/login', {
    routePath: '/login',
    pageTitle: 'Login'
  });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email.');

        return res.redirect('/login');
      }

      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.authenticated = true;
            req.session.user = user;
            return req.session.save(err => {
              if (err) console.log(err);

              res.redirect('/');
            });
          }

          req.flash('error', 'Invalid password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res) => {
  req.session.destroy(err => {
    if (err) console.log(err);

    res.redirect('/');
  });
};

exports.getSignup = (req, res) => {
  res.render('auth/signup', {
    routePath: '/signup',
    pageTitle: 'Signup'
  });
};

exports.postSignup = (req, res) => {
  const { email, password, confirmPassword } = req.body;

  User.findOne({ email })
    .then(user => {
      if (user) {
        req.flash('error', 'E-mail already exists.');
        return res.redirect('/signup');
      }

      return bcrypt
        .hash(password, parseInt(BCRYPT_SALT, 10))
        .then(hashedPassword => {
          const user = new User({
            email,
            password: hashedPassword,
            cart: { items: [] }
          });

          return user.save();
        })
        .then(() => res.redirect('/login'));
    })
    .catch(err => console.log(err));
};
