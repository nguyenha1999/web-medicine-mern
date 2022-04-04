const Backend = require('../../model/resource');

module.exports = {
  get_index: () => Backend.find().lean(),
  put_index: (backend) => Backend(backend).save(),
  post_index: (backend) => Backend.findByIdAndUpdate(backend._id, backend),
  get_activated: () =>
    Backend.find({ activated: true }, 'title description').lean()
};
