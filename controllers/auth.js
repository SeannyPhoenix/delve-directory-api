const mongoose = require(`mongoose`);
const bcrypt = require(`bcrypt`);
const db = require(`../models`);
const APIErrors = require(`../utilities`);

const saltRounds = 10;

async function register(req, res) {
  try {
    registration = req.body;
    if (
      !registration.screenName ||
      !registration.email ||
      !registration.password
    ) {
      throw new Error(`missing fields`);
    }

    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(registration.password, salt);
    registration.password = hash;

    let newUser = await db.User.create(registration);

    res.json({
      user: trimUser(newUser)
    });
  } catch (err) {
    APIErrors.handleError(err, res);
  }
}

async function login(req, res) {
  try {
    let request = req.body;
    if (!request.email || !request.password) {
      throw new Error(`missing fields`);
    }

    let loggedInUser = await db.User.findOne({
      email: request.email
    });
    if (!loggedInUser) {
      throw new Error(`invalid credentials`);
    }

    let check = await bcrypt.compare(request.password, loggedInUser.password);
    if (!check) {
      throw new Error(`invalid credentials`);
    }

    req.session.currentUser = loggedInUser;
    console.log(req.session);
    res.status(200).json({
      user: trimUser(loggedInUser)
    });
  } catch (err) {
    APIErrors.handleError(err, res);
  }
}

async function verify(req, res) {
  try {
    let currentUser = await isLoggedIn(req);
    if (!currentUser) {
      console.log("no user");
      throw new Error(`not logged in`);
    }

    res.json({
      user: trimUser(currentUser)
    });
  } catch (err) {
    APIErrors.handleError(err, res);
  }
}

async function logout(req, res) {
  try {
    req.session.destroy();
    res.sendStatus(200);
  } catch (err) {
    APIErrors.handleError(err, res);
  }
}

async function isLoggedIn(req) {
  console.log(req.session);
  if (!req.session.currentUser) {
    return false;
  }

  let currentUser = await db.User.findById(req.session.currentUser._id);

  if (!currentUser) {
    return false;
  }
  return currentUser;
}

function trimUser(user) {
  return {
    _id: user._id,
    screenName: user.screenName,
    email: user.email
  };
}

module.exports = {
  register,
  login,
  verify,
  logout
};
