const mongoose = require(`mongoose`);
const db = require(`../models`);
const { APIErrors } = require(`../utilities`);

async function create(req, res) {
  try {
    let tableData = req.body;
    console.log(tableData);
    res.sendStatus(200);
  } catch (err) {
    APIErrors.handleErrors(err, res);
  }
}

async function index(req, res) {
  try {
  } catch (err) {
    APIErrors.handleErrors(err, res);
  }
}

async function show(req, res) {
  try {
  } catch (err) {
    APIErrors.handleErrors(err, res);
  }
}

async function update(req, res) {
  try {
  } catch (err) {
    APIErrors.handleErrors(err, res);
  }
}

async function destroy(req, res) {
  try {
  } catch (err) {
    APIErrors.handleErrors(err, res);
  }
}

module.exports = {
  create,
  index,
  show,
  update,
  destroy
};
