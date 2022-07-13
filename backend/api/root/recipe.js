const Recipe = require("../../model/chem");

module.exports = {
  index: async function (code) {
    const test = await Recipe.findOne({ code: code }).populate(
      "subChems.chemId"
    );
    return test;
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
