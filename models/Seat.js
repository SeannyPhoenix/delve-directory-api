const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const SeatSchema = new Schema({
  profile: {
    type: ObjectId,
    ref: "Profile"
  },
  role: String
});

const Seat = mongoose.model("Seat", SeatSchema);

module.exports = Seat;
