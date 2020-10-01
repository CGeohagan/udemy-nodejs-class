// Nodejs core modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// NPM modules
const app = express();

app.set('view engine', 'pug');
// This is the default so we don't need to use it
app.set('views', 'views');

// Separate files
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

// can use routes like normal middleware
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);