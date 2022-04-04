const getArgs = require('./getArgs');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const fileUpload = require('./file-upload');
const saveFilesUpload = require('../middleware/saveFilesUpload');
const getArgVals = require('./getArgVals');

function createReqHandler(
  endPoint,
  viewPath,
  httpVerb,
  locationPath,
  securityLevel
) {
  const handlers = [];

  if (securityLevel) {
    handlers.push(auth);
    if (securityLevel === 2) {
      handlers.push(authorize(locationPath, httpVerb));
    }
  }

  // Upload files
  if (typeof endPoint === 'object' && endPoint.uploadConfig) {
    const uploadConfig = endPoint.uploadConfig || {};
    handlers.push(fileUpload(uploadConfig));
    if (uploadConfig.savedPath) {
      handlers.push(saveFilesUpload(uploadConfig.savedPath));
    }
  }

  const businessFunc =
    typeof endPoint === 'function' ? endPoint : endPoint.func;
  const args = getArgs(businessFunc);

  handlers.push(async (req, res, next) => {
    try {
      const argVals = getArgVals(args, req);
      const data = await businessFunc.apply(businessFunc, argVals);
      if (viewPath) {
        if (data) res.render(viewPath, data);
        else res.render(viewPath);
      } else res.json(data);
    } catch (err) {
      next(err);
    }
  });

  return handlers;
}

module.exports = createReqHandler;
