const Chemistries = require("../../model/chemistry");

module.exports = {
  index: function () {
    return Chemistries.find();
  },
  post_index: function (name, code, use, price) {
    return Chemistries.create({
      name: name,
      code: code,
      use: use,
      price: price,
    });
  },
};
