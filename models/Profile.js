const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  screenName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
