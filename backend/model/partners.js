const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
  name: String,
  hotline: Number,
  address: String,
  code: String,
  isDeleted: Boolean,
  nameCompany: String,
  products: [
    {
      name: String,
      count: Number,
      price: Number,
      product: { type: mongoose.SchemaTypes.ObjectId, ref: "Chemistries" },
    },
  ],
});

module.exports = mongoose.model("partners", PartnerSchema);
