const mongoose = require(`mongoose`);
const db = require(`../models`);
const util = require(`../utilities`);

async function index(req, res) {
  try {
    let games = await db.Game.find();
    util.Error.validateFound(games);
    res.json(games);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function show(req, res) {
  try {
    util.Error.validateObjectId(req.params.id);
    let game = await db.Game.findById(req.params.id);
    util.Error.validateFound(game);
    res.json(game);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

module.exports = {
  index,
  show
};
