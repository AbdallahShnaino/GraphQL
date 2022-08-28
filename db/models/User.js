const mongoose = require('mongoose');
// create user model and export it 
const User = mongoose.model('User', {
     username: String,
     firstName: String,
     lastName: String
     });
module.exports = User