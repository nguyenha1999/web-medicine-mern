const Imports = require("../../model/import");
const Chemistries = require("../../model/chemistry");
const Tracks = require("../../model/tracking");

module.exports = {
  index: function (role) {
    if (role === "admin") {
      return Imports.find();
    }
    return Imports.find({ isDeleted: false });
  },

  post_index: async function (isExport, createdAt, products, staff) {
    products.map(async (e) => {
      const countChemistry = await Chemistries.find({ _id: e._id });
      let newCount = countChemistry[0].count + e.count;
      await Chemistries.findByIdAndUpdate(e._id, { count: newCount });
    });

    const price = products
      .map((product) => product.count * product.price)
      .reduce((curr, pre) => curr + pre);

    const isExitTracks = (await Tracks.exists({ createdAt })) ?? {};
    if (isExitTracks) {
      const track = await Tracks.findOne({ createdAt });
      let newTrackValue = Tracks.totalImport + price;
      await Tracks.findByIdAndUpdate(track._id, { totalImport: newTrackValue });
    } else {
      await Tracks.create({
        createdAt: createdAt,
        totalImport: price,
        totalExport: 0,
      });
    }
    return await Imports.create({
      isExport: isExport,
      createdAt: createdAt,
      products: products,
      isDeleted: false,
      staffs: staff,
      totalPrice: price,
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
