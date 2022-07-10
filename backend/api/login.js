const jwt = require("jsonwebtoken");
const ServerError = require("../utils/serverError");

const Users = require("../model/user");

module.exports = {
  post_index: async function (email, password, _app_secretKey) {
    const user = await Users.findOne({ email: email, password: password });
    // "-createdOn -activated"
    // ).populate({
    //   path: "roles",
    //   populate: {
    //     path: "frontends",
    //     match: { activated: true },
    //     select: "-_id title url",
    //   },
    //   match: { activated: true },
    //   select: "-_id title frontends",
    // });
    if (!user) throw new ServerError("Bad Request", 400);
    // if (!user.authenticate(password))
    //   throw new ServerError("Unauthenticated", 401);
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "ha12",
      { expiresIn: "2h" }
    );
    user.salt = undefined;
    user.hashedPass = undefined;
    // user.password = "******";
    return { token, user };
  },
};
