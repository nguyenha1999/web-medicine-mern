const Bills = require("../../model/bills");

module.exports = {
  index: function (type) {
    const types = type === "export" ? true : false;
    return Bills.find({ isExport: types, isDeleted: false });
  },
  post_index: function (isExport, createdAt) {
    return Bills.create({ isExport: isExport, createAt: createdAt });
  },
  put_index: function () {},
  put_location: function (_id, isDeleted) {
    return Bills.findByIdAndUpdate(_id, { isDeleted });
  },
};
