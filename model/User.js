const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: String,
  notes: {
    type: [String],
    default: undefined
  }
});

module.exports = mongoose.model('user', userSchema);