const mongoose = require(`mongoose`);
const db = require(`../models`);
const util = require(`../utilities`);

async function add(req, res) {
  try {
    util.Error.validateObjectId(req.params.tableId);
    let thisTable = await db.Table.findById(req.params.tableId);
    util.Error.validateExists(thisTable);
    let addSeat = await db.Seat.create(req.body);
    thisTable.seats.push(addSeat._id);
    thisTable.save();
    res.status(201).json(addSeat);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function update(req, res) {
  try {
    util.Error.validateObjectId(req.params.id);
    if (!req.body.profile) {
      delete req.body.profile;
    }
    let updateSeat = await db.Seat.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updateSeat);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function remove(req, res) {
  try {
    util.Error.validateObjectId(req.params.tableId);
    util.Error.validateObjectId(req.params.seatId);
    let thisTable = await db.Table.findById(req.params.tableId);
    util.Error.validateExists(thisTable);
    let deleteSeat = await db.Seat.findByIdAndDelete(req.params.seatId);
    thisTable.seats.slice(
      thisTable.seats.indexOf({ _id: req.params.seatId }),
      1
    );
    thisTable.save();
    res.json(deleteSeat);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function request(req, res) {
  try {
    util.Error.validateObjectId(req.params.tableId);
    util.Error.validateObjectId(req.params.userId);
    let thisTable = await db.Table.findById(req.params.tableId);
    util.Error.validateExists(thisTable);
    if (!thisTable.requests) {
      thisTable.requests = [];
    }
    thisTable.requests.push(req.params.userId);
    thisTable.save();
    res.sendStatus(201);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

module.exports = {
  add,
  update,
  remove,
  request
};
