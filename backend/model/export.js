const mongoose = require("mongoose");

const ExportSchema = new mongoose.Schema({
  name: String,
  isExport: Boolean,
  nameCompany: String,
  staffs: [
    {
      username: String,
      code: String,
      staff: { type: mongoose.SchemaTypes.ObjectId, ref: "Users" },
    },
  ],
  isDeleted: Boolean,
  totalPrice: Number,
  code: String,
  products: [
    {
      name: String,
      count: Number,
      price: Number,
      product: { type: mongoose.SchemaTypes.ObjectId, ref: "Chemistries" },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("exports", ExportSchema);
