exports.getLogin = (req, res, next) => {
  const cookies = new Map(req.get('Cookie').split(';').map(cookie => cookie.trim().split('=')));
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: cookies.get('loggedIn')
  })
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIn=true');
  res.redirect('/');
};
