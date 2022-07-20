const mongoose = require("mongoose");

const SubChem = new mongoose.Schema({
  chemId: { type: mongoose.SchemaTypes.ObjectId, ref: "chemistries" },
  ratio: Number,
});

const ChemistrySchema = new mongoose.Schema({
  name: String,
  code: String,
  price: Number,
  isDeleted: Boolean,
  count: Number,
  unit: String,
  state: String,
  use: String,
  nameCompany: String,
  countExportOfMounth: Number,
  staff: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Users" }],
  product: String,
  createdAt: { type: Date, default: Date.now },
  children: [SubChem],
});

module.exports = mongoose.model("chemistries", ChemistrySchema);
