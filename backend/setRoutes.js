const path = require('path');
const getRoutes = require('./utils/getRoutes');

function normalizeLocationPath(alias, locationPath) {
  let nLocationPath = path.join(alias, locationPath);
  if (!path.isAbsolute(nLocationPath)) {
    nLocationPath = path.join(path.sep, nLocationPath);
  }
  nLocationPath = nLocationPath.split(path.sep).join('/');
  return nLocationPath;
}

function setRoutes(app, controllerPath, api, alias = '') {
  const routes = getRoutes(controllerPath, api);
  routes.forEach((route) => {
    console.log(
      `${route.httpVerb} on ${normalizeLocationPath(alias, route.locationPath)}`
    );
    app[route.httpVerb](
      normalizeLocationPath(alias, route.locationPath),
      route.reqHandler
    );
  });
}

module.exports = setRoutes;
