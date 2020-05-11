const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PointSchema = new Schema({
  type: {
    type: String
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const ZipDataSchema = new Schema({
  type: {
    type: String
  },
  geometry: PointSchema,
  properties: {
    city: String,
    state: String,
    zip: String,
    dst: Number,
    geopoint: [Number],
    longitude: Number,
    latitude: Number,
    timezone: Number
  }
});

ZipDataSchema.index({ geometry: "2dsphere" });

const ZipData = mongoose.model("ZipData", ZipDataSchema);

module.exports = ZipData;
