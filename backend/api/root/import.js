const Imports = require("../../model/import");

console.log(Imports);
module.exports = {
  index: function () {
    return Imports.find({});
  },
  post_index: function (isExport, createdAt, product, staff) {
    console.log(isExport);
    return Imports.create({
      isExport: isExport,
      createdAt: createdAt,
      product: product,
      isDeleted: false,
      staff: staff,
    });
  },
  put_index: function () {},
  put_location: function (_id, isDeleted) {
    return Imports.findByIdAndUpdate(_id, { isDeleted });
  },
};
