/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const path = require('path');
const ServerError = require('../utils/serverError');

async function saveFile(file, savedPath) {
  const newPath = path.join(savedPath, file.name);
  return new Promise((resolve, reject) => {
    file.mv(newPath, (err) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      if (err) reject('File can not saved');
      resolve(file.name);
    });
  });
}

function saveFilesUpload(savedPath) {
  const absSavedPath = path.join(process.cwd(), savedPath);
  return async (req, res, next) => {
    if (req.files && Object.keys(req.files).length) {
      Promise.all(
        Object.keys(req.files).map(async (file) =>
          saveFile(req.files[file], absSavedPath)
        )
      )
        .then((savedFiles) => {
          req.savedFiles = savedFiles.map((fileName) =>
            path.join(savedPath, fileName)
          );
          next();
        })
        .catch((reason) => {
          next(new ServerError(400, reason));
        });
    } else next();
  };
}

module.exports = saveFilesUpload;
