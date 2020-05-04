const bcrypt = require(`bcrypt`);
const Error = require(`./Error`);

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
}

module.exports = Session;
