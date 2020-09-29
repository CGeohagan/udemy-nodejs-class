// Nodejs core modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// NPM modules
const app = express();

// Separate files
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded());

// can use routes like normal middleware
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);