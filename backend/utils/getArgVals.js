function getArgVals(args, req) {
  const httpVerb = req.method;
  req.query = req.query || {};
  req.params = req.params || {};
  req.body = req.body || {};
  return args.map((argName) => {
    // eslint-disable-next-line no-undef-init
    let paramVal = undefined; // ensure for using default value if paramVal is not passed
    if (argName.startsWith('_req_')) {
      paramVal = req[argName.substring(5)];
    } else if (argName.startsWith('_app_')) {
      paramVal = req.app.get(argName.substring(5));
    } else if (httpVerb === 'GET' || httpVerb === 'DELETE') {
      paramVal = req.query[argName]; // get value from querystring
      if (paramVal === undefined) paramVal = req.params[argName]; // get value from local path
    } else {
      // post or put
      paramVal = req.body[argName];
      if (paramVal === undefined) paramVal = req.params[argName];
      if (paramVal === undefined) paramVal = req.query[argName];
    }

    return paramVal;
  });
}

module.exports = getArgVals;
