const mongoose = require("mongoose");

const SubChem = new mongoose.Schema({
  chemId: { type: mongoose.SchemaTypes.ObjectId, ref: "chems" },
  ratio: Number,
});

const ChemSchema = new mongoose.Schema({
  name: String,
  code: String,
  price: Number,
  countExportOfMounth: Number,
  isDeleted: Boolean,
  count: Number,
  use: String,
  nameCompany: String,
  staff: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Users" }],
  product: String,
  createdAt: { type: Date, default: Date.now },
  ///subChems: [{ subChem: ChemSchema, ratio: Number }],
  children: [SubChem],
});

module.exports = mongoose.model("chems", ChemSchema);
