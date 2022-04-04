const path = require('path');
const getFiles = require('./getFiles');
const parseEndPoint = require('./parseEndPoint');
const createReqHandler = require('./createReqHandler');

function getRoutes(cPath, api = true) {
  let controllerPath = cPath;
  if (!path.isAbsolute(cPath)) {
    controllerPath = path.join(process.cwd(), cPath);
  }

  const routes = [];

  getFiles(controllerPath).forEach((controlerFile) => {
    const pathComps = path.parse(controlerFile);
    let basePath = pathComps.dir.replace(controllerPath, '');
    if (pathComps.name.trim().toLowerCase() !== 'index') {
      basePath = path.join(basePath, pathComps.name);
    }
    /* eslint-disable-next-line global-require, import/no-dynamic-require */
    const controller = require(controlerFile);
    if (typeof controller === 'object') {
      const endpoints = Object.keys(controller);
      endpoints.forEach((endpoint) => {
        if (
          typeof controller[endpoint] === 'function' ||
          (typeof controller[endpoint] === 'object' &&
            controller[endpoint].func &&
            typeof controller[endpoint].func === 'function')
        ) {
          const { methodName, httpVerb, securityLevel } = parseEndPoint(
            endpoint
          );

          let viewPath = api ? false : endpoint;
          if (viewPath) {
            if (basePath) viewPath = `${basePath}/${endpoint}`;
            viewPath = viewPath
              .replace(/\/:/g, '-') // replace /:a/:b to -a-b
              .replace(/^\//, ''); // ensure viewPath is relative path
          }

          const locationPath = methodName
            ? path.join(basePath, methodName)
            : basePath;

          const reqHandler = createReqHandler(
            controller[endpoint],
            viewPath,
            httpVerb,
            locationPath,
            securityLevel
          );

          routes.push({
            locationPath,
            httpVerb,
            securityLevel,
            reqHandler
          });
        }
      });
    }
  });

  return routes.sort((a, b) => {
    if (a.locationPath.length > b.locationPath.length) return -1;
    if (a.locationPath.length < b.locationPath.length) return 1;
    return 0;
  });
}

module.exports = getRoutes;
