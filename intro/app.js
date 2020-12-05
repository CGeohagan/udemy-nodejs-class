// Nodejs core modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = process.env.DB_URI;

// NPM modules
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
// This is the default so it's unnecessary, but showing for clarity
app.set('views', 'views');

// Separate files
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded());
// Allows for use of public css/js files
app.use(express.static(path.join(__dirname, 'public')));
// in production should be a long string value
app.use(
  session({ 
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then(user => {
      // Use session data already set to load a real user
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// can use routes like normal middleware
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    })

    app.listen(3000);
  })
  .catch(err => console.log(err));




