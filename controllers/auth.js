const crypto = require('crypto');
const { uniqWith, isEqual } = require('lodash');

const redirectToError = require('../util/error-redirect');

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator');

const { BCRYPT_SALT, SENDGRID_API_KEY, MAIL_SENDER } = process.env;

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: SENDGRID_API_KEY
    }
  })
);

exports.getLogin = (req, res) => {
  res.render('auth/login', {
    routePath: '/login',
    pageTitle: 'Login'
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      routePath: '/login',
      pageTitle: 'Login',
      formValues: { email, password },
      validationErrors: uniqWith(errors.array(), isEqual)
    });
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(422).render('auth/login', {
          routePath: '/login',
          pageTitle: 'Login',
          errorMessage: ['E-mail not found'],
          formValues: { email, password }
        });
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

          return res.status(422).render('auth/login', {
            routePath: '/login',
            pageTitle: 'Login',
            errorMessage: ['Invalid password'],
            formValues: { email, password }
          });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => redirectToError(err, next));
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

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      routePath: '/signup',
      pageTitle: 'Signup',
      formValues: { email , password, confirmPassword },
      validationErrors: uniqWith(errors.array(), isEqual)
    });
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
    .then(() => {
      res.redirect('/login');
      return transporter.sendMail({
        to: email,
        from: MAIL_SENDER,
        subject: 'Signup complete',
        html: '<h1>Xesquedele!</h1>'
      });
    })
    .catch(err => redirectToError(err, next));
};

exports.getResetPassword = (req, res) => {
  res.render('auth/reset', {
    routePath: '/reset',
    pageTitle: 'Reset password'
  });
};

exports.postResetPassword = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }

    const token = buffer.toString('hex');
    const { email } = req.body;

    User.findOne({ email })
      .then(user => {
        if (!user) {
          req.flash('error', 'E-mail not found.');
          return res.redirect('/reset');
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 360000;
        return user.save();
      })
      .then(result => {
        res.redirect('/');
        return transporter.sendMail({
          to: email,
          from: MAIL_SENDER,
          subject: 'Password reset',
          html: `
            <p>Click the link below to set a new password</p>
            <p><a href="http://localhost:3000/update-password/${token}">Xesque</a></p>
          `
        })
      })
      .catch(err => redirectToError(err, next));
  });
};

exports.getUpdatePassword = (req, res, next) => {
  const { token } = req.params;

  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      res.render('auth/update-password', {
        routePath: '/update-password',
        pageTitle: 'Update password',
        userId: user._id.toString(),
        resetToken: token
      });
    })
    .catch(err => redirectToError(err, next));
};

exports.postUpdatePassword = (req, res, next) => {
  const { userId, password, resetToken } = req.body;
  let resetUser;

  User.findOne({ _id: userId, resetToken, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(password, parseInt(BCRYPT_SALT, 10))
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(() => res.redirect('/login'))
    .catch(err => redirectToError(err, next));
};