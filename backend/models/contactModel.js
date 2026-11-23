const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String
}, {
  versionKey: false // 👈 __v remove
});

module.exports = mongoose.model("Contact", contactSchema);