const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  url: String,
  name: String,
  size: Number,
  type: String,
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  chemistry: { type: mongoose.Schema.Types.ObjectId, ref: "Chemistries" },
});

module.exports = mongoose.model("Images", ImageSchema);
