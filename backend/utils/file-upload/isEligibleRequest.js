const ACCEPTABLE_CONTENT_TYPE = /^(multipart\/.+);(.*)$/i;
const UNACCEPTABLE_METHODS = ['GET', 'HEAD'];

/**
 * Ensures the request contains a content body
 * @param  {Object}  req Express req object
 * @returns {Boolean}
 */
// eslint-disable-next-line prettier/prettier
const hasBody = (req) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  'transfer-encoding' in req.headers ||
  ('content-length' in req.headers && req.headers['content-length'] !== '0');

/**
 * Ensures the request is not using a non-compliant multipart method
 * such as GET or HEAD
 * @param  {Object}  req Express req object
 * @returns {Boolean}
 */
const hasAcceptableMethod = (req) => !UNACCEPTABLE_METHODS.includes(req.method);

/**
 * Ensures that only multipart requests are processed by express-fileupload
 * @param  {Object}  req Express req object
 * @returns {Boolean}
 */
// eslint-disable-next-line prettier/prettier
const hasAcceptableContentType = (req) =>
  ACCEPTABLE_CONTENT_TYPE.test(req.headers['content-type']);

/**
 * Ensures that the request in question is eligible for file uploads
 * @param {Object} req Express req object
 * @returns {Boolean}
 */
// eslint-disable-next-line prettier/prettier
module.exports = (req) =>
  hasBody(req) && hasAcceptableMethod(req) && hasAcceptableContentType(req);
