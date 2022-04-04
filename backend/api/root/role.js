const Role = require('../../model/role');
const RoleHistory = require('../../model/roleHistory');

module.exports = {
  get_index: function () {
    return Role.find()
      .populate({
        path: 'frontends',
        match: { activated: true },
        select: 'title description'
      })
      .populate({
        path: 'backends',
        match: { activated: true },
        select: 'title description'
      })
      .lean();
  },
  post_index: function (role, reason, username) {
    return Role.findByIdAndUpdate(role._id, role)
      .then((data) => {
        return RoleHistory({
          roleId: role._id,
          type: 'Update',
          reason: reason,
          username: username
        }).save();
      })
      .then((log) => {
        return log.roleId;
      });
  },
  put_index: function (role, reason, username) {
    return Role(role)
      .save()
      .then((role) => {
        return RoleHistory({
          roleId: role._id,
          type: 'Created',
          reason: reason,
          username: username
        }).save();
      })
      .then((log) => {
        return log.roleId;
      });
  },
  post_activate: function (roleId, reason, activated, username) {
    return Role.findById(roleId)
      .then((role) => {
        role.activated = activated;
        return role.save();
      })
      .then((r) => {
        return RoleHistory({
          roleId: r._id,
          type: activated ? 'activate' : 'disable',
          reason: reason,
          username: username
        }).save();
      });
  },
  get_activated: function () {
    return Role.find({ activated: true }, 'title description').lean();
  }
};
