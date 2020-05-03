const mongoose = require(`mongoose`);
const db = require(`../models`);
const util = require(`../utilities`);

async function create(req, res) {
  try {
    registration = req.body;
    if (
      !registration.screenName ||
      !registration.email ||
      !registration.password
    ) {
      throw new Error(`missing fields`);
    }

    registration.password = await util.Session.hashPassword(
      registration.password
    );

    let newProfile = await db.Profile.create(registration);

    res.json({
      user: util.Profile.trimProfile(newProfile)
    });
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function show(req, res) {
  try {
    let thisProfile = await db.Profile.findById(req.params.id);

    res.json(util.Profile.trimProfile(thisProfile));
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function update(req, res) {
  try {
    let updateProfile = await db.Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(util.Profile.trimProfile(updateProfile));
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function deactivate(req, res) {
  try {
    let deactivateProfile = await db.Profile.findByIdAndUpdate(
      req.params.id,
      {
        active: false
      },
      {
        new: true
      }
    );
    res.json(util.Profile.trimProfile(deactivateProfile));
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

module.exports = {
  create,
  show,
  update,
  deactivate
};