const Parners = require("../../model/partners");
const moment = require("moment");

module.exports = {
  index: async function (role, search) {
    if (search) {
      let searchValue;
      if (typeof search === "string") {
        searchValue = await Parners.find({
          $or: [{ code: search }, { nameCompany: search }, { address: search }],
        });
      } else if (typeof search === "number") {
        searchValue = await Parners.find({
          $or: [
            { code: search },
            { nameCompany: search },
            { address: search },
            { hotline: search },
          ],
        });
      }
      return searchValue;
    }
    if (role === "admin") {
      return await Parners.find().sort({ createdAt: -1 });
    }

    return await Parners.find({ isDeleted: false }).sort({ createdAt: -1 });
  },
  post_index: function (address, hotline, nameCompany, products) {
    return Parners.create({
      code: `P_${new Date().getMilliseconds()}`,
      address: address,
      hotline: hotline,
      nameCompany: nameCompany,
      isDeleted: false,
      products: products,
    });
  },
  put_index: function (_id, address, hotline, nameCompany, products) {
    return Parners.findByIdAndUpdate(_id, {
      address,
      hotline,
      nameCompany,
      products,
    });
  },
  delete_index: function (id, role) {
    if (role === "admin") {
      return Parners.findByIdAndDelete(id);
    }
    return Parners.findByIdAndUpdate(id, { isDeleted: true });
  },
};
