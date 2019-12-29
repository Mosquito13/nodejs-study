exports.getPageNotFound = (req, res) => {
  res.status(404).render('page-not-found', {
    pageTitle: 'Page not found',
    routePath: 'notFound',
    isAuthenticated: req.isLoggedIn
  });
};
