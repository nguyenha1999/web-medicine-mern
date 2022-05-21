import { Mongoose } from "mongoose";

const { Schema, model } = Mongoose;

const PartnerSchema = new Schema({
  name: String,
  tel: Number,
  adress: String,
  code: String,
});

export default model("partners", PartnerSchema);
