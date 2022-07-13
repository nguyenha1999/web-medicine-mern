const Exports = require("../../model/export");
const Chemistries = require("../../model/chemistry");

module.exports = {
  index: function (role) {
    if (role === "admin") {
      return Exports.find();
    }
    return Exports.find({ isDeleted: false });
  },

  post_index: function (isExport, createdAt, products, staff) {
    products.map(async (e) => {
      const countChemistry = await Chemistries.find({ _id: e._id });
      let newCount = countChemistry[0].count - e.count;
      await Chemistries.findByIdAndUpdate(e._id, { count: newCount });
    });

    const price = products
      .map((product) => product.count * product.price)
      .reduce((curr, pre) => curr + pre);
    return Exports.create({
      isExport: !isExport,
      createdAt: createdAt,
      products: products,
      isDeleted: false,
      totalPrice: price,
      staffs: staff,
      code: `EPB_${new Date().getMilliseconds()}`,
    });
  },

  put_index: function () {},

  delete_index: function (id, role) {
    if (role === "admin") {
      return Exports.findByIdAndDelete(id);
    }
    return Exports.findByIdAndUpdate(id, { isDeleted: true });
  },
};
