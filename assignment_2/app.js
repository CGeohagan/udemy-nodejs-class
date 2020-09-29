const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
  console.log('/users middleware');
  res.send('<p>Assignment solved /users</p>');
});

app.use('/', (req, res, next) => {
  console.log('/ middleware');
  res.send('<p>Assignment solved /</p>');
})

app.listen(3000);