const mongoose = require("mongoose");

const ImportSchema = new mongoose.Schema({
  name: String,
  //   isExport: Boolean,
  nameCompany: String,
  staff: String,
  isDeleted: Boolean,
  product: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Chemistries" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("imports", ImportSchema);
