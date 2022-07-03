const Imports = require("../../model/import");

module.exports = {
  index: function () {
    return Imports.find({ isDeleted: false });
  },

  post_index: function (isExport, createdAt, products, staff) {
    return Imports.create({
      isExport: isExport,
      createdAt: createdAt,
      products: products,
      isDeleted: false,
      staffs: staff,
      code: `IPB_${new Date().getMilliseconds()}`,
    });
  },

  put_index: function () {},

  delete_index: function (id) {
    return Imports.findByIdAndUpdate(id, { isDeleted: true });
  },
};
