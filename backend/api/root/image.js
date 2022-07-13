const Images = require("../../model/images");
const formidable = require("formidable");

module.exports = {
  index: function (id) {
    return Images.find({ id });
  },
  post_index: function (formData) {
    return { imageUrl: "formData" };
  },
};
