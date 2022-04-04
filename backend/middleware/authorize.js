const User = require('../model/user');
const ServerError = require('../utils/serverError');

function authorize(locationPath, httpVerb) {
  return async (req, res, next) => {
    const userId = req.userId;
    const user = await User.findById(userId)
      .populate({
        path: 'roles',
        populate: {
          path: 'backends',
          match: {
            activated: true,
            httpVerb: httpVerb.trim().toLowerCase(),
            locationPath: locationPath.trim().toLowerCase()
          }
        },
        match: { activated: true }
      })
      .exec();

    if (
      !(
        user &&
        user.roles &&
        user.roles.length &&
        user.roles[0].backends &&
        user.roles[0].backends.length &&
        user.roles[0].backends[0].httpVerb === httpVerb.trim().toLowerCase() &&
        user.roles[0].backends[0].locationPath ===
          locationPath.trim().toLowerCase()
      )
    ) {
      next(new ServerError(403, 'Forbiden'));
    } else {
      next();
    }
  };
}

module.exports = authorize;
