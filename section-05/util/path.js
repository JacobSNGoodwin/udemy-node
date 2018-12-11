const path = require('path');

// basically gives us a path to the directory containing app.js (the main module)
module.exports = path.dirname(process.mainModule.filename);