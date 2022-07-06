const mongoose = require("mongoose");

const RoleHistorySchema = new mongoose.Schema({
  roleId: String,
  type: String,
  reason: String,
  username: String,
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RoleHistory", RoleHistorySchema);
