const mongoose = require("mongoose");

const ImportSchema = new mongoose.Schema({
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
  code: String,
  totalPrice: Number,
  products: [
    {
      name: String,
      count: Number,
      price: Number,
      code: String,
      product: { type: mongoose.SchemaTypes.ObjectId, ref: "Chemistries" },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("imports", ImportSchema);
