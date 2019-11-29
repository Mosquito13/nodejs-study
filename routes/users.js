const express = require('express');

const userManager = require('./user-manager');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('users', {
    pageTitle: 'Users',
    routePath: '/users',
    users: userManager.users
  });
});

module.exports = router;
