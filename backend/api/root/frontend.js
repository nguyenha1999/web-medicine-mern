const Frontend = require('../../model/frontend');

module.exports = {
  get_index: () => Frontend.find().lean(),
  put_index: (frontend) => Frontend(frontend).save(),
  post_index: (frontend) => Frontend.findByIdAndUpdate(frontend._id, frontend),
  get_activated: () =>
    Frontend.find({ activated: true }, 'title description').lean()
};
