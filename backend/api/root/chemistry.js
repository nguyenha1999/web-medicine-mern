const ServerError = require("../../utils/serverError");
const Chemistries = require("../../model/chemistry");
const Recipe = require("../../model/chem");

module.exports = {
  index: function (role) {
    if (role === "admin") {
      return Chemistries.find();
    }

    return Chemistries.find();
  },

  post_index: async function (name, code, use, price) {
    Recipe.create({
      name: name,
      code: code,
      price: price,
      isDeleted: false,
      use: use,
      children: [],
    });

    const isExit = await Chemistries.exists({ code });

    if (isExit) {
      return { error: true, message: "Hoá chất đã tồn tại" };
    }

    return await Chemistries.create({
      name: name,
      code: code,
      countExportOfMounth: 0,
      use: use,
      price: price,
      count: 1,
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

    return Chemistries.create({
      name: newName,
      code: newCode,
      use: use,
      price: price,
      count: 1,
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
  delete_index: function (id, role) {
    if (role === "admin") {
      return Chemistries.findByIdAndDelete(id);
    }
    return Chemistries.findByIdAndUpdate(id, { isDeleted: true });
  },
};
