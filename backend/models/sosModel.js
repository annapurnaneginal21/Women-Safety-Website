const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema({
  message: {
    type: String,
    default: "Emergency Alert 🚨"
  },
  time: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

module.exports = mongoose.model("SOS", sosSchema);