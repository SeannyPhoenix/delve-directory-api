const mongoose = require(`mongoose`);
const db = require(`../models`);
const util = require(`../utilities`);

async function radius(req, res) {
  try {
    let params = req.params;
    if (params.zip) {
      let zipData = await db.ZipData.findOne({ "properties.zip": params.zip });
      util.Error.validateFound(zipData);
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
    res.json(zipNear);
  } catch (err) {
    console.log(err);
    util.Error.handleErrors(err, res);
  }
}

async function show(req, res) {
  try {
    let zip = req.params.zip;
    let zipData = await db.ZipData.findOne({ "properties.zip": zip });
    util.Error.validateFound(zipData);
    res.json(zipData);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

module.exports = {
  radius,
  show
};
