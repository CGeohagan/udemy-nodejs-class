// Nodejs core modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// NPM modules
const app = express();

app.set('view engine', 'ejs');
// This is the default so it's unnecessary, but showing for clarity
app.set('views', 'views');

// Separate files
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded());
// Allows for use of public css/js files
app.use(express.static(path.join(__dirname, 'public')));

// can use routes like normal middleware
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);