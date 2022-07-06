const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String,
  activated: Boolean,
  author: String,
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Home", HomeSchema);
