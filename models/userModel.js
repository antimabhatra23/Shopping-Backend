const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  usertype: {type: String, default: customer}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
