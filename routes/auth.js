const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.get('/reset', authController.getResetPassword);
router.get('/update-password/:token', authController.getUpdatePassword);

router.post('/logout', authController.postLogout);
router.post('/reset', authController.postResetPassword);
router.post('/update-password', authController.postUpdatePassword);

router.post(
  '/login',
  [
    body('email', 'Invalid e-mail')
      .isEmail()
      .normalizeEmail(),
    body('password', 'Invalid password')
      .isLength({ min: 5 })
      .isAlphanumeric()
  ],
  authController.postLogin
);

router.post(
  '/signup',
  [
    body('email', 'Invalid e-mail')
      .isEmail()
      .custom(value => {
        return User.findOne({ email: value })
          .then(user => {
            if (user) {
              return Promise.reject('E-mail already exists');
            }
          })
      })
      .normalizeEmail(),
    body('password', 'Invalid password (only number and text, at least 5)')
      .trim()
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body('confirmPassword', 'Passwords have to match')
      .trim()
      .custom((value, { req }) => {
        return value === req.body.password;
      })
  ],
  authController.postSignup
);

module.exports = router;
