const Imports = require("../../model/import");
const Chemistries = require("../../model/chemistry");

module.exports = {
  index: function (role) {
    if (role === "admin") {
      return Imports.find();
    }
    return Imports.find({ isDeleted: false });
  },

  post_index: function (isExport, createdAt, products, staff) {
    products.map(async (e) => {
      const countChemistry = await Chemistries.find({ _id: e._id });
      let newCount = countChemistry[0].count + e.count;
      await Chemistries.findByIdAndUpdate(e._id, { count: newCount });
    });
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

  delete_index: function (id, role) {
    if (role === "admin") {
      return Imports.findByIdAndDelete(id);
    }
    return Imports.findByIdAndUpdate(id, { isDeleted: true });
  },
};
