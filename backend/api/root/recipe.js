const Recipe = require("../../model/recipe");

module.exports = {
  index: function (code) {
    return Recipe.find({ code: code });
  },

  post_index: function () {
    return Recipes.create();
  },
  put_index: function (_id, name, code, price, use) {
    return Recipes.findByIdAndUpdate(_id, {
      use,
      name,
      code,
      price,
    });
  },
  delete_index: function (id) {
    return Recipes.findByIdAndUpdate(id, { isDeleted: true });
  },
};
