// core modules
const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  // Don't add / because we are using path.join 
  res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
})

module.exports = router;

