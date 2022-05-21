const mongoose = require('mongoose');

const FuncLogSchema = new mongoose.Schema({
  funcId: String,
  funcType: String,
  reason: String,
  activated: Boolean,
  username: String,
  createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FuncLog', FuncLogSchema);
