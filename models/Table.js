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
  location: {
    latitude: Number,
    longitude: Number
  },
  game: {
    type: ObjectId,
    ref: "Game"
  },
  seats: [
    {
      type: ObjectId,
      ref: "Seat"
    }
  ],
  published: {
    type: Boolean,
    default: false
  }
});

const Table = mongoose.model("Table", TableSchema);

module.exports = Table;
