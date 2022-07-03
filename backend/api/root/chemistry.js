const ServerError = require("../../utils/serverError");
const Chemistries = require("../../model/chemistry");

module.exports = {
  index: function (page, limit) {
    return Chemistries.find({ isDeleted: false });
  },

  post_index: function (name, code, use, price) {
    // const isExit = await Chemistries.exists({ name: name, code: code });

    // if (isExit) {
    //   return new ServerError(400, "Hoá chất đã tồn tại");
    // }

    return Chemistries.create({
      name: name,
      code: code,
      use: use,
      price: price,
      isDeleted: false,
    });
  },
  get_name: async function (name) {
    const isExit = await Chemistries.exists({ name: name });

    if (isExit) {
      return new ServerError(400, "Tên hoá chất đã tồn tại");
    }
  },
  get_code: async function (code) {
    const isExit = await Chemistries.exists({ code: code });

    if (isExit) {
      return new ServerError(400, "Mã hoá chất đã tồn tại");
    }
  },
  post_clone: function (_id, name, code, use, price) {
    let numberOfProcedure = Chemistries.countDocuments({ name: name });

    const newName = `[Clone]_${name}`;
    const newCode = `[Clone]_${code}`;

    console.log(numberOfProcedure);
    return Chemistries.create({
      name: newName,
      code: newCode,
      use: use,
      price: price,
      isDeleted: false,
    });
  },
  put_index: function (_id, name, code, price, use) {
    return Chemistries.findByIdAndUpdate(_id, {
      use,
      name,
      code,
      price,
    });
  },
  delete_index: function (id) {
    return Chemistries.findByIdAndUpdate(id, { isDeleted: true });
  },
};
