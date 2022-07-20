const ServerError = require("../../utils/serverError");
const Chemistries = require("../../model/chemistry");

module.exports = {
  index: async function (role, search) {
    if (search) {
      const a = await Chemistries.find({
        $or: [{ code: search }, { name: search }],
      });
      return a;
    }
    if (role === "admin") {
      return await Chemistries.find({}).sort({ createdAt: -1 });
    }

    if (!role && !search) {
      return await Chemistries.find({});
    }
    return await Chemistries.find({ isDeleted: true }).sort({ createdAt: -1 });
  },

  post_index: async function (name, code, use, price, image) {
    const isExit = await Chemistries.exists({ code });

    console.log(image);

    // if (isExit) {
    //   return { error: true, message: "Hoá chất đã tồn tại" };
    // }

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
  post_clone: async function (_id, name, code, use, price) {
    let numberOfProcedure = await Chemistries.countDocuments({ name: name });

    const newName = `${name}_${numberOfProcedure}`;
    const newCode = `${code}_${numberOfProcedure}`;

    return await Chemistries.create({
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
