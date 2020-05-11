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
      util.Error.validateExists(tableUser);
    } else {
      tableUser = await util.Session.getCurrentProfile(req);
    }
    let userTables = await db.Table.find({ owner: tableUser._id });
    util.Error.validateExists(userTables);
    res.json(userTables);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function index(req, res) {
  try {
    let allTables = await db.Table.find().populate([
      {
        path: "owner",
        select: "active screenName email"
      },
      "game",
      {
        path: "seats",
        populate: {
          path: "profile",
          select: "active screenName email"
        }
      },
      {
        path: "requests",
        select: "active screenName email"
      }
    ]);
    res.json(allTables);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function indexInRadius(req, res) {
  try {
    let params = req.params;
    if (params.zip) {
      let zipData = await db.ZipData.findOne({ "properties.zip": params.zip });
      util.Error.validateExists(zipData);
      params.coordinates = zipData.geometry.coordinates;
    } else {
      params.coordinates = [params.longitude, params.latitude];
    }
    let zipNear = await db.ZipData.find({
      geometry: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: params.coordinates
          },
          $maxDistance: params.radius,
          $minDistance: 0
        }
      }
    });
    let zipsInRadius = zipNear.map(zip => zip.properties.zip);
    let allTables = await db.Table.find({
      zip: { $in: zipsInRadius }
    }).populate([
      {
        path: "owner",
        select: "active screenName email"
      },
      "game",
      {
        path: "seats",
        populate: {
          path: "profile",
          select: "active screenName email"
        }
      },
      {
        path: "requests",
        select: "active screenName email"
      }
    ]);
    res.json(allTables);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function show(req, res) {
  try {
    util.Error.validateObjectId(req.params.id);
    let thisTable = await db.Table.findById(req.params.id).populate([
      {
        path: "owner",
        select: "active screenName email"
      },
      "game",
      {
        path: "seats",
        populate: {
          path: "profile",
          select: "active screenName email"
        }
      },
      {
        path: "requests",
        select: "active screenName email"
      }
    ]);
    util.Error.validateExists(thisTable);
    thisTable.seats.sort((a, b) => a.createdAt - b.createdAt);
    res.json(thisTable);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function update(req, res) {
  try {
    util.Error.validateObjectId(req.params.id);
    let tableData = req.body;
    // Don't update seats with this endpoint
    delete tableData.seats;
    // Set proper location data
    if (tableData.zip) {
      let zipData = await db.ZipData.findOne({
        "properties.zip": tableData.zip
      });
      util.Error.validateExists(zipData);
      tableData.coordinates = zipData.properties.geopoint;
    }
    let updateTable = await db.Table.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    util.Error.validateExists(updateTable);
    res.json(updateTable);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function destroy(req, res) {
  try {
    util.Error.validateObjectId(req.params.id);
    let deleteTable = await db.Table.findByIdAndDelete(req.params.id);
    util.Error.validateExists(deleteTable);
    res.json(deleteTable);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

module.exports = {
  create,
  index,
  indexInRadius,
  userIndex,
  show,
  update,
  destroy
};
