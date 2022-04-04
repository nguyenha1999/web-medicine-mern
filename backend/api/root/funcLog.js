const FuncLog = require('../../model/funcLog');
const RoleHistory = require('../../model/roleHistory');
const Frontend = require('../../model/frontend');
const Backend = require('../../model/resource');

module.exports = {
  get_index: () => FuncLog.find().lean(),
  put_index: (log) =>
    FuncLog(log)
      .save()
      .then((l) => {
        if (log.funcType === 'frontend') return Frontend.findById(l.funcId);
        return Backend.findById(l.funcId);
      })
      .then((f) => {
        f.activated = log.activated;
        return f.save();
      }),
  get_roleHistory: (log) => RoleHistory.find().lean()
};
