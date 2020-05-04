const mongoose = require(`mongoose`);
const db = require(`../models`);
const util = require(`../utilities`);

async function create(req, res) {
  try {
    let tableData = req.body;
    if (!tableData.owner) {
      util.Error.throwError(400);
    }
    let newTable = await db.Table.create(tableData);
    res.json(newTable);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function userIndex(req, res) {
  try {
    let tableUser = null;
    if (req.params.id) {
      util.Error.validateObjectId(req.params.id);
      tableUser = await await db.Profile.findById(req.params.id);
      util.Error.validateFound(tableUser);
    } else {
      tableUser = await util.Session.getCurrentProfile(req);
    }
    let userTables = await db.Table.find({ owner: tableUser._id });
    util.Error.validateFound(userTables);
    res.json(userTables);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function index(req, res) {
  try {
    let allTables = await db.Table.find().populate("seats");
    res.json(allTables);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function show(req, res) {
  try {
    util.Error.validateObjectId(req.params.id);
    let thisTable = await db.Table.findById(req.params.id);
    util.Error.validateFound(thisTable);
    res.json(thisTable);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function update(req, res) {
  try {
    util.Error.validateObjectId(req.params.id);
    delete req.body.seats; // Don't update seats with this endpoint
    let updateTable = await db.Table.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    util.Error.validateFound(updateTable);
    res.json(updateTable);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function destroy(req, res) {
  try {
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

module.exports = {
  create,
  index,
  userIndex,
  show,
  update,
  destroy
};
