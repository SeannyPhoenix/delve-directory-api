const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const TableSchema = new Schema({
  name: String,
  owner: {
    type: ObjectId,
    ref: "User",
    reqired: true
  },
  // location: {
  //   type: {},
  //   required: true,
  // },
  game: {
    type: ObjectId,
    ref: "Game"
  },
  seats: [
    {
      type: ObjectId,
      ref: "User"
    }
  ]
});

const Table = mongoose.model("Table", TableSchema);

module.exports = Table;
