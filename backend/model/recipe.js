const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: String,
  code: String,
  parentId: String,
  childrenId: String,
  ratio: Number,
  depth: Number,
});

module.exports = mongoose.model("Recipes", RecipeSchema);
