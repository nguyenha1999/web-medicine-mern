const Bills = require("../../model/bills");

module.exports = {
  index: function () {
    return Bills.find();
  },
  post_index: function (isExport, createdAt) {
    console.log(createdAt);
    return Bills.create({ isExport: isExport, createAt: createdAt });
  },
};
