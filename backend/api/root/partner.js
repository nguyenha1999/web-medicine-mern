const Parners = require("../../model/partners");
const moment = require("moment");

module.exports = {
  index: function (role) {
    if (role === "admin") {
      return Parners.find();
    }
    return Parners.find({ isDeleted: false });
    // .skip((page - 1) * limit)
    // .limit(limit);
  },
  post_index: function (address, hotline, nameCompany, products) {
    return Parners.create({
      code: `P_${moment().format("DD/MM/YYYY")}`,
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
