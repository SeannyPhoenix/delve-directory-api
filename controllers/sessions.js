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
    util.Error.validateExists(newSessionProfile);
    await util.Session.checkPassword(
      request.password,
      newSessionProfile.password
    );
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
    let currentSessionProfile = await util.Session.getCurrentProfile(req);
    res.json(util.Profile.trimProfile(currentSessionProfile));
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

module.exports = {
  login,
  verify,
  logout
};
