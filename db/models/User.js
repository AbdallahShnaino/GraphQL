const mongoose = require('mongoose');
const User = mongoose.model('User', {
     username: String,
     firstName: String,
     lastName: String
     });
module.exports = User