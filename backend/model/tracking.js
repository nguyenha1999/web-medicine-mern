const mongoose = require("mongoose");

const TrackerSchema = new mongoose.Schema({
  totalExport: Number,
  totalImport: Number,
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("tracks", TrackerSchema);
