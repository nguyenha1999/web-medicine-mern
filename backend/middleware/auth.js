const jwt = require('jsonwebtoken');
const ServerError = require('../utils/serverError');

function authenticate(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else if (decoded.userId) {
        resolve(decoded.userId);
      } else {
        reject(new jwt.JsonWebTokenError('Bad Token'));
      }
    });
  });
}

async function auth(req, res, next) {
  const secret = req.app.get('secretKey');

  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';
  if (token) {
    const userId = await authenticate(token, secret);
    req.userId = userId;
    next();
  } else next(new ServerError(401, 'Unauthenticated'));
}

module.exports = auth;
