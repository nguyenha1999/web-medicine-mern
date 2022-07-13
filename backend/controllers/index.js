const processIndex = (c = 5, a, b = 4, _app_secretKey) => ({
  message: "Hello world!",
  sum: 5,
  a: 10,
  secret: _app_secretKey,
});

function processIndexWithParams(id) {
  console.log("index abc is executed", id);
  return { c, a, b };
}

module.exports = {
  index: { func: processIndex },
  "index/:id": processIndexWithParams,
  "delete/:id": function (id) {},
  post_upload: {
    uploadConfig: {
      savedPath: "/uploaded",
    },
    func: (testField, _req_savedFiles) => {
      return { testField, savedPaths: _req_savedFiles };
    },
  },
};
