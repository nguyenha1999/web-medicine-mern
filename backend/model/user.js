const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  // hashedPass: String,
  // salt: String,
  // fullname: String,
  // avatarUrl: String,
  // roles: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Role" }],
  // activated: { type: Boolean, default: true },
  // createdOn: { type: Date, default: Date.now },
});

// UserSchema.virtual("password")
//   .set(function (password) {
//     this._password = password;
//     this.salt = this.genSalt();
//     this.hashedPass = this.hashPassword(password);
//   })
//   .get(function () {
//     return this._password;
//   });

// UserSchema.methods = {
//   authenticate(password) {
//     return this.hashPassword(password) === this.hashedPass;
//   },
//   hashPassword(password) {
//     if (!password) return "";
//     try {
//       return crypto
//         .createHmac("sha256", this.salt)
//         .update(password)
//         .digest("hex");
//     } catch (err) {
//       return "Lỗi ở password";
//     }
//   },
//   genSalt() {
//     return `${Math.round(new Date().valueOf() * Math.random())}`;
//   },
// };
module.exports = mongoose.model("users", UserSchema);
