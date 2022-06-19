const mongoose = require("mongoose");

const ChemistrySchema = new mongoose.Schema({
  name: String,
  code: String,
  sprice: Number,
  isDeleted: Boolean,
  use: String,
  nameCompany: String,
  staff: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Users" }],
  product: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("chemistries", ChemistrySchema);
