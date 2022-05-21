import Mongoose from "mongoose";

const { Schema, model } = Mongoose;

const ProductSchema = new Schema({
  name: String,
  count: Number,
  price: Number,
  calculationUnit: String,
  createAt: { type: Date, default: Date.now() },
});

export default model("products", ProductSchema);
