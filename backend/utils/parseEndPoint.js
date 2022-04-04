function parseEndPoint(endPoint) {
  const tmp = endPoint.split('_');
  let methodName = endPoint;
  let httpVerb = 'get';
  let securityLevel = 0;

  if (tmp.length === 2) {
    methodName = tmp[1];
    if (tmp[0] === 'u') securityLevel = 1;
    else if (tmp[0] === 'o') securityLevel = 2;
    else httpVerb = tmp[0];
  } else if (tmp.length === 3) {
    methodName = tmp[2];
    httpVerb = tmp[1];
    if (tmp[0] === 'u') securityLevel = 1;
    else securityLevel = 2;
  }

  // If this is the "index" method, we map it to the path directly.
  if (methodName === 'index') methodName = '';

  // process for index with param: index/:id
  if (methodName.startsWith('index/')) {
    methodName = methodName.substr(6);
  }

  httpVerb = httpVerb.toLowerCase();

  return { methodName, httpVerb, securityLevel };
}

module.exports = parseEndPoint;
