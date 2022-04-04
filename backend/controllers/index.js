const processIndex = (c = 5, a, b = 4, _app_secretKey) => ({
  message: 'Hello world!',
  sum: 5,
  a: 10,
  secret: _app_secretKey
});
function processIndexWithParams(
  c = 5 /* first param */,
  // second next param
  a, /// nothongs
  b = 4 /* second param */
) {
  console.log('index abc is executed');
  return { c, a, b };
}

module.exports = {
  index: { func: processIndex },
  'index/:c/:a/:b': processIndexWithParams,
  post_upload: {
    uploadConfig: {
      savedPath: '/uploaded'
    },
    func: (testField, _req_savedFiles) => {
      console.log(_req_savedFiles);
      return { testField, savedPaths: _req_savedFiles };
    }
  }
};
