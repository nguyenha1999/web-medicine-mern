import Mongoose from "mongoose";

const { Schema, model } = Mongoose;

const BillSchema = new Schema({
  name: String,
  isExport: Boolean,
  nameCompany: String,
  staff: String,
  product: String,
  createAt: { type: Date, default: Date.now() },
});

const a = new BillSchema({ name: "Lee nGOC hA" });
console.log(a);

export default model("bills", BillSchema);
