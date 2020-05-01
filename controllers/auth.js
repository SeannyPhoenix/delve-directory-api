const mongoose = require(`mongoose`);
const bcrypt = require(`bcrypt`);
const db = require(`../models`);

console.log(db.User.create);

const saltRounds = 10;

async function register(req, res) {
  try {
    registration = req.body;
    if (!registration.screenName || !registration.email || !registration.password) {
      throw new Error(`bad request`);
    }

    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(registration.password, salt);
    registration.password = hash;

    console.log(registration);

    let newUser = await db.User.create(registration);

    res.json({
      newUser,
    });
  }
  catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

module.exports = {
  register,
}