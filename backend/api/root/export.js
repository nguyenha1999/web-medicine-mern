const Exports = require("../../model/export");
const Chemistries = require("../../model/chemistry");
const Tracks = require("../../model/tracking");
const moment = require("moment");

module.exports = {
  index: async function (role, search) {
    if (search) {
      const searchValue = await Exports.find({
        $or: [{ code: search }, { "staffs.username": search }],
      }).sort({ createdAt: -1 });
      return searchValue;
    }
    if (role === "admin") {
      return await Exports.find().sort({ createdAt: -1 });
    }

    return await Exports.find({ isDeleted: false }).sort({ createdAt: -1 });
  },

  post_index: async function (isExport, createdAt, products, staff) {
    products.map(async (e) => {
      const countChemistry = await Chemistries.findOne({ _id: e._id });
      let newCount = countChemistry.count - e.count;
      let updateCountExportOfMounth;
      if (
        moment().format("YYYY-MM-DD") !==
        moment().clone().startOf("month").format("YYYY-MM-DD")
      ) {
        updateCountExportOfMounth =
          countChemistry.countExportOfMounth + e.count;
      } else {
        updateCountExportOfMounth = 0;
      }
      await Chemistries.findByIdAndUpdate(e._id, {
        count: newCount,
        countExportOfMounth: updateCountExportOfMounth,
      });
    });

    const price = products
      .map((product) => product.count * product.price)
      .reduce((curr, pre) => curr + pre);

    const isExitTracks = (await Tracks.exists({ createdAt })) ?? {};
    if (isExitTracks) {
      const track = await Tracks.findOne({ createdAt });
      let newTrackValue = track.totalExport + price;
      await Tracks.findByIdAndUpdate(track._id, { totalExport: newTrackValue });
    } else {
      await Tracks.create({
        createdAt: createdAt,
        totalExport: price,
        totalImport: 0,
      });
    }

    return await Exports.create({
      isExport: !isExport,
      createdAt: createdAt,
      products: products,
      isDeleted: false,
      totalPrice: price,
      staffs: staff,
      code: `EPB_${new Date().getMilliseconds()}`,
    });
  },

  put_index: async function (createdAt, _id, products, staff) {
    const price = products
      .map((product) => product.count * product.price)
      .reduce((curr, pre) => curr + pre);

    return await Exports.findByIdAndUpdate(_id, {
      createdAt,
      products,
      staff,
      price: price,
    });
  },

  delete_index: function (id, role) {
    if (role === "admin") {
      return Exports.findByIdAndDelete(id);
    }
    return Exports.findByIdAndUpdate(id, { isDeleted: true });
  },
};
