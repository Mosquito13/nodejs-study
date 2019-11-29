const express = require('express');

const router = express.Router();

const users = [];

router.get('/add-user', (req, res) => {
  res.render('add-user', {
    pageTitle: 'Add user',
    routePath: '/add-user'
  });
});

router.post('/add-user', (req, res) => {
  users.push({ name: req.body.name });
  res.redirect('/');
});

exports.users = users;
exports.routes = router;
