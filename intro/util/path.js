const path = require('path');

// gives us the path to the main module that started the application (i.e., app.js )
// we are getting the path to that directory
module.exports = path.dirname(process.mainModule.filename);