const Exports = require("../../model/export");
const Chemistries = require("../../model/chemistry");
const Tracks = require("../../model/tracking");
const moment = require("moment");

module.exports = {
  index: function (role) {
    if (role === "admin") {
      return Exports.find();
    }
    return Exports.find({ isDeleted: false });
  },

  post_index: async function (isExport, createdAt, products, staff) {
    products.map(async (e) => {
      const countChemistry = await Chemistries.find({ _id: e._id });
      let newCount = countChemistry[0].count - e.count;
      let updateCountExportOfMounth;
      if (
        moment().format("YYYY-MM-DD") !==
        moment().clone().startOf("month").format("YYYY-MM-DD")
      ) {
        updateCountExportOfMounth =
          countChemistry[0].countExportOfMounth + e.count;
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
    const oldProductList = await Exports.findOne({ _id });
    oldProductList.products.map(async (e) => {
      const countChemistry = await Chemistries.findOne({ name: e.name });
      const resetCount = countChemistry?.count - e?.count;
      const updateCountExportOfMounth =
        countChemistry?.countExportOfMounth - e?.count;

      await Chemistries.findByIdAndUpdate(e._id, {
        count: resetCount,
        countExportOfMounth: updateCountExportOfMounth,
      });
    });

    products.map(async (e) => {
      const countChemistry = await Chemistries.findOne({ name: e.name });
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
      console.log("a", track);
      console.log("has", oldProductList);
      let resetTrackValue = track?.totalExport - oldProductList.totalPrice;
      console.log(resetTrackValue);
      await Tracks.findByIdAndUpdate(track._id, {
        totalExport: resetTrackValue,
      });

      let newTrackValue = track?.totalExport + price;
      await Tracks.findByIdAndUpdate(track._id, {
        totalExport: newTrackValue,
      });
    } else {
      await Tracks.create({
        createdAt: createdAt,
        totalExport: price,
        totalImport: 0,
      });
    }

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
