const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const signup = async (name, email, phone, password) => {
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = new User({ name, email, phone, password: hashedPassword });
  await user.save();
  return { message: 'User registered successfully' };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ id: user._id }, "ANTIMA_SECERET", { expiresIn: '1h' });
  return { message: 'Login successful', token, userId: user._id };
};

module.exports = {
  signup,
  login,
};
