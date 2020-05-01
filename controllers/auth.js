const mongoose = require(`mongoose`);
const bcrypt = require(`bcrypt`);
const db = require(`../models`);

console.log(db.User.create);

const saltRounds = 10;

async function register(req, res) {
  try {
    registration = req.body;
    if (!registration.screenName || !registration.email || !registration.password) {
      throw new Error(`missing fields`);
    }

    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(registration.password, salt);
    registration.password = hash;

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

async function login(req, res) {
  try {
    let request = req.body;
    if (!request.email || !request.password) {
      throw new Error(`missing fields`);
    }

    let loggedInUser = await db.User.findOne({
      email: request.email,
    });
    if (!loggedInUser) {
      throw new Error(`invalid credentials`);
    }
    let check = await bcrypt.compare(
      request.password,
      loggedInUser.password
    );
    if (!check) {
      throw new Error(`invalid credentials`);
    }

    req.session.currentUser = loggedInUser;
    res.status(200).json({
      _id: loggedInUser._id,
      screenName: loggedInUser.screenName,
      email: loggedInUser.email,
    });

  }
  catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function verify(req, res) {
  try {
    let currentUser = await isLoggedIn(req);

    if (!currentUser) {
      throw new Error(`not logged in`);
    }

    res.json(currentUser);
  }
  catch (err) {
    res.sendStatus(500);
  }
}

async function isLoggedIn(req) {
  if (!req.session.currentUser) {
    return false;
  }

  let currentUser = await db.User.findById(req.session.currentUser._id);

  if (!currentUser) {
    return false;
  }
  return currentUser;
}

async function logout(req, res) {
  try {
    req.session.currentUser = null;
    res.sendStatus(200);
  }
  catch (err) {
    res.sendStatus(500);
  }
}

module.exports = {
  register,
  login,
  verify,
  logout
}