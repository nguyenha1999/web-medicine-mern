const Users = require("../../model/user");
const UserHistory = require("../../model/userHistory");
const crypto = require("crypto");

module.exports = {
  get_index: function (role) {
    if (role === "admin") {
      return Users.find();
    }
    // return User.find({}, "-hashedPass -salt")
    //   .populate({
    //     path: "roles",
    //     match: { activated: true },
    //     select: "title description",
    //   })
    //   .lean();
    return Users.find({ activated: true });
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
    console.log(isExit);
    if (isExit) {
      return { error: true, message: "Email đã tồn tại" };
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
  delete_index: function (id, role) {
    if (role === "admin") {
      return Users.findByIdAndDelete(id);
    }
    return Users.findByIdAndUpdate(id, { activated: false });
  },
};
