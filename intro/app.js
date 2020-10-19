// Nodejs core modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

// NPM modules
const app = express();

app.set('view engine', 'ejs');
// This is the default so it's unnecessary, but showing for clarity
app.set('views', 'views');

// Separate files
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded());
// Allows for use of public css/js files
app.use(express.static(path.join(__dirname, 'public')));

// Will only run for incoming requests
app.use((req, res, next) => {
  User.findById('5f8d7ae0eac6afa2ff421796')
    .then(user => {
      // Setting up so request always has dummy user
      console.log('hi colleen user in app', user)
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// can use routes like normal middleware
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});




