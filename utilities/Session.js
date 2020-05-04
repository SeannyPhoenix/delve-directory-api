const bcrypt = require(`bcrypt`);
const Error = require(`./Error`);
const ctrl = require(`../controllers`);
const db = require(`../models`);

const saltRounds = 10;

class Session {
  static async hashPassword(plaintext) {
    return await bcrypt.hash(plaintext, saltRounds);
  }

  static async checkPassword(plaintext, hash) {
    if (!(await bcrypt.compare(plaintext, hash))) {
      Error.throwError(401);
    }
  }

  static async getCurrentProfile(req) {
    if (!req.session.currentProfile) {
      Error.throwError(401);
    }
    let currentSessionProfile = await db.Profile.findById(
      req.session.currentProfile._id
    );
    if (!currentSessionProfile) {
      Error.throwError(404);
    }
    return currentSessionProfile;
  }
}

module.exports = Session;
