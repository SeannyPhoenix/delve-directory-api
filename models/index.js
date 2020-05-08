const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.log(`MongoDB connection error: ${err}`));

module.exports = {
  Profile: require(`./Profile`),
  Table: require(`./Table`),
  Seat: require(`./Seat`),
  Game: require(`./Game`),
  ZipData: require(`./ZipData`)
};
