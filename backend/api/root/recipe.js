const Parners = require("../../model/partners");
module.exports = {
  index: function () {
    return Parners.find();
    // .skip((page - 1) * limit)
    // .limit(limit);
  },
  post_index: function (andress, hotline, nameCompany) {
    return Parners.create({
      andress: andress,
      hotline: hotline,
      nameCompany: nameCompany,
      isDeleted: false,
    });
  },
  put_index: function (_id, name, code, price, use) {
    return Parners.findByIdAndUpdate(_id, {
      use,
      name,
      code,
      price,
    });
  },
  delete_index: function (id) {
    return Parners.findByIdAndUpdate(id, { isDeleted: true });
  },
};
