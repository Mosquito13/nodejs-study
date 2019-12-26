exports.getLogin = (req, res) => {
  res.render('auth/login', {
    routePath: '/login',
    pageTitle: 'Login'
  });
};
