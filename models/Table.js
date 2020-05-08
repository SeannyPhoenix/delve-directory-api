const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const Seat = require("./Seat");

const TableSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: ObjectId,
    ref: "Profile",
    reqired: true
  },
  game: {
    type: ObjectId,
    ref: "Game"
  },
  location: {
    latitude: Number,
    longitude: Number,
    zipcode: String
  },
  published: {
    type: Boolean,
    default: false
  },
  info: String,
  seats: [
    {
      type: ObjectId,
      ref: "Seat"
    }
  ]
});

const Table = mongoose.model("Table", TableSchema);

module.exports = Table;
