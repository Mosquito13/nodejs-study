const User = require('../models/user');

exports.getLogin = (req, res) => {
  res.render('auth/login', {
    routePath: '/login',
    pageTitle: 'Login'
  });
};

exports.postLogin = (req, res) => {
  User.findById('5df97f96dbd5c92288b4fed0')
    .then(user => {
      req.session.authenticated = true;
      req.session.user = user;
      req.session.save(err => {
        if (err) console.log(err);

        res.redirect('/');
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
