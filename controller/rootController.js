const path = require('path');
const User = require('../model/User');

const sendHtml = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'view', 'index.html'));
};

const verificate = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(401);

  res.json({ 'username': foundUser.username, 'notes': foundUser.notes });
}; 

const createNewNote = async (req, res) => {
  const text = req.body.text;

  const foundUser = await User.findOne({ username: req.user }).exec();
  foundUser.notes.push(text);
  await foundUser.save();
  
  res.sendStatus(200);
};

module.exports = { sendHtml, verificate, createNewNote };