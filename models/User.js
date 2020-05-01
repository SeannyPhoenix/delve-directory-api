const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  screenName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;