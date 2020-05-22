exports.getPageNotFound = (req, res) => {
  res.status(404).render('page-not-found', {
    pageTitle: 'Page not found',
    routePath: 'notFound'
  });
};

exports.getServerError = (req, res) => {
  res.status(500).render('server-error', {
    pageTitle: 'Error',
    routePath: 'serverError'
  })
};
