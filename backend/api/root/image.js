const Images = require("../../model/images");
const formidable = require("formidable");

module.exports = {
  index: function (formData) {
    console.log(formData);
    const form = formidable({
      uploadDir: "uploads",
      keepExtensions: true,
      keepFilenames: true,
    });

    form.on("fileBegin", function (field, file) {
      file.path = form.uploadDir + "/" + new Date().getTime() + "_" + file.name;
    });

    form.parse(request, async (err, fields, files) => {
      if (err) {
        console.log(err);
      }

      const file = files[""];
    });
    return Images.find({ id });
  },
  post_index: function (formData) {
    console.log(formData);

    return "ha";
  },
};
