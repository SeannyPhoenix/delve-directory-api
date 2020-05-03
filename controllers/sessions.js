const mongoose = require(`mongoose`);
const db = require(`../models`);
const util = require(`../utilities`);

async function login(req, res) {
  try {
    let request = req.body;
    if (!request.email || !request.password) {
      util.Error.throwError(401);
    }

    let newSessionProfile = await db.Profile.findOne({
      email: request.email
    });

    if (!newSessionProfile) {
      util.Error.throwError(401);
    }

    let check = await util.Session.checkPassword(
      request.password,
      newSessionProfile.password
    );

    if (!check) {
      util.Error.throwError(401);
    }

    req.session.currentProfile = newSessionProfile;
    res.json({
      user: util.Profile.trimProfile(newSessionProfile)
    });
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function verify(req, res) {
  try {
    let currentSessionProfile = await isLoggedIn(req);
    if (!currentSessionProfile) {
      util.Error.throwError(401);
    }

    res.json({
      user: util.Profile.trimProfile(currentSessionProfile)
    });
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function logout(req, res) {
  try {
    req.session.destroy();
    res.sendStatus(200);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function isLoggedIn(req) {
  if (!req.session.currentProfile) {
    return false;
  }

  let currentSessionProfile = await db.Profile.findById(
    req.session.currentProfile._id
  );

  if (!currentSessionProfile) {
    return false;
  }
  return currentSessionProfile;
}

module.exports = {
  login,
  verify,
  logout
};
