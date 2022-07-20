const Users = require("../../model/user");

const crypto = require("crypto");

module.exports = {
  get_index: async function (role, search) {
    if (search) {
      const searchValue = await Users.find({
        $or: [{ code: search }, { username: search }, { role: search }],
      }).sort({ createdOn: -1 });
      return searchValue;
    }
    if (role === "admin") {
      return await Users.find().sort({ createdOn: -1 });
    }

    return await Users.find({ isDeleted: false }).sort({ createdOn: -1 });
  },
  get_profile: function (email) {
    return Users.find({ email: email });
  },
  put_profile: function (_id, password) {
    return Users.findByIdAndUpdate(_id, { password });
  },
  post_index: async function (
    email,
    code,
    username,
    password,
    branch,
    value,
    tel,
    role
  ) {
    const isExit = await Users.exists({ email });
    if (isExit) {
      return await { error: true, message: "Email đã tồn tại" };
    }
    return await Users.create({
      email: email,
      code: code,
      username: username,
      password: password,
      branch: branch,
      value: value,
      tel: tel,
      role: role,
      activated: true,
    });
  },
  put_index: function (
    _id,
    branch,
    code,
    email,
    value,
    password,
    role,
    username
  ) {
    return Users.findByIdAndUpdate(_id, {
      branch,
      username,
      code,
      email,
      value,
      role,
      password,
    });
  },
  delete_index: function (id, role) {
    if (role === "admin") {
      return Users.findByIdAndDelete(id);
    }
    return Users.findByIdAndUpdate(id, { activated: false });
  },
};
