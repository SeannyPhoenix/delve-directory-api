const bcrypt = require(`bcrypt`);

const saltRounds = 10;

class Session {
  static async hashPassword(plaintext) {
    return await bcrypt.hash(plaintext, saltRounds);
  }
  static async checkPassword(plaintext, hash) {
    return await bcrypt.compare(plaintext, hash);
  }
}

module.exports = Session;
