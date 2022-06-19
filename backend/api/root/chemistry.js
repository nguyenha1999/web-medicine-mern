const Chemistries = require("../../model/chemistry");

module.exports = {
  index: function () {
    return Chemistries.find({ isDeleted: false });
  },
  post_index: function (name, code, use, price) {
    return Chemistries.create({
      name: name,
      code: code,
      use: use,
      price: price,
      isDeleted: false,
    });
  },
  put_index: function (_id, name, code, price, use) {
    return Chemistries.findByIdAndUpdate(_id, {
      use,
      name,
      code,
      price,
    });
  },
  put_location: function (_id, isDeleted) {
    console.log(_id);
    return Chemistries.findByIdAndUpdate(_id, { isDeleted });
  },
};
