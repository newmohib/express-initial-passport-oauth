const path = require('path');

// require('dotenv-safe').load({
//   path: path.join(__dirname, "../.env"),
//   sample: path.join(__dirname, "../.env.example")
// });
require('dotenv-safe').config();
var secret = process.env.SESSION_SECRET;
var port = process.env.PORT;

module.exports = {
    secret:secret,
    port:port
};