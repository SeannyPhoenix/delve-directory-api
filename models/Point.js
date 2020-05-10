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

const Point = mongoose.model("Point", PointSchema);

module.exports = Point;
