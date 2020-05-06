const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  publisher: {
    type: String
    // required: true
  },
  website: {
    type: String
    // required: true
  }
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
