const Exports = require("../../model/export");

module.exports = {
  index: function () {
    return Exports.find({ isDeleted: false });
  },

  post_index: function (isExport, createdAt, products, staff) {
    return Exports.create({
      isExport: !isExport,
      createdAt: createdAt,
      products: products,
      isDeleted: false,
      staffs: staff,
      code: `EPB_${new Date().getMilliseconds()}`,
    });
  },

  put_index: function () {},

  delete_index: function (id) {
    return Exports.findByIdAndUpdate(id, { isDeleted: true });
  },
};
