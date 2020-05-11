const bcrypt = require(`bcrypt`);

class Profile {
  static trimProfile(profile) {
    return {
      _id: profile._id,
      screenName: profile.screenName,
      email: profile.email,
      active: profile.active
    };
  }
}

module.exports = Profile;
