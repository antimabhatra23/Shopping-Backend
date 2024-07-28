const userService = require('../services/userService');

const signup = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const response = await userService.signup(name, email, phone, password);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send({ error: 'Email already exists' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await userService.login(email, password);
    res.send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
};
