const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema({
  name: String,
  phone: String,
  location: String,
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SOS", sosSchema);