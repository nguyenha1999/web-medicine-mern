const Imports = require("../../model/import");
const Chemistries = require("../../model/chemistry");
const Tracks = require("../../model/tracking");

module.exports = {
  index: async function (role, search) {
    if (search) {
      const searchValue = await Imports.find({
        $or: [{ code: search }, { "staffs.username": search }],
      }).sort({ createdAt: -1 });
      return searchValue;
    }
    if (role === "admin") {
      return await Imports.find().sort({ createdAt: -1 });
    }

    return await Imports.find({ isDeleted: false }).sort({ createdAt: -1 });
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

  put_index: async function (createdAt, _id, products, staff) {
    const price = products
      .map((product) => product.count * product.price)
      .reduce((curr, pre) => curr + pre);

    return await Imports.findByIdAndUpdate(_id, {
      createdAt,
      products,
      staff,
      price: price,
    });
  },

  delete_index: function (id, role) {
    if (role === "admin") {
      return Imports.findByIdAndDelete(id);
    }
    return Imports.findByIdAndUpdate(id, { isDeleted: true });
  },
};
