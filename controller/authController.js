const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const sendHtml = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'view', 'auth.html'));
};

const sendResult = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.json({ 'message': 'Username, password and repass required' });

  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) return res.json({ 'message': "User with that name doesn't exists" });

  const validity = await bcrypt.compare(password, foundUser.password);
  if (validity) {
    // Creating jwts
    const accessToken = jwt.sign(
      { 'username': foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
      { 'username': foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )

    // Saving jwt with current user
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ accessToken: accessToken });
  } else {
    return res.json({ 'message': 'Password is incorrect' });
  }
};

module.exports = {
  sendHtml,
  sendResult
};