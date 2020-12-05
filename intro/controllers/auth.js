const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  })
};

exports.postLogin = (req, res, next) => {
  User.findOne()
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err))
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};

// When we do log in we fetch user data
// don't store user on request object
// store user on the session and only after the user is logged in
// fetch the user and store the user in the session
// adjust the admin controller so you use that session