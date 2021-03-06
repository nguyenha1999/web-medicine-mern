const mongoose = require('mongoose');

const FrontendSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String,
  activated: Boolean,
  author: String,
  createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Frontend', FrontendSchema);
