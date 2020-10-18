// Nodejs core modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');


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
  User.findByPk(1)
    .then(user => {
      // Setting up so request always has dummy user
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// can use routes like normal middleware
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// Creates tables for the models
// Syncs models to the database
sequelize
  // .sync({ force:true })
  .sync()
  .then(result => {
    // Create a dummy user
    return User.findByPk(1)
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Colleen', email: 'fakeemail@gmail.com'})
    }

    return Promise.resolve(user)
  })
  .then(user => {
    console.log(user)
    app.listen(3000);
  })
  .catch(err => {
    console.log(err)
  });

