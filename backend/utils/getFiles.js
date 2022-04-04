const fs = require('fs');
const path = require('path');

/** Get all js files in the specific path.
 *
 * @param string path - The path to search folder.
 *
 * @return array of file ext paths.
 */
function getFiles(controllerFolder) {
  const possibleJSFiles = fs.readdirSync(controllerFolder);
  const jsFiles = [];

  possibleJSFiles.forEach((file) => {
    if (fs.statSync(path.join(controllerFolder, file)).isFile()) {
      if (path.extname(file).toLowerCase() === '.js') {
        jsFiles.push(path.join(controllerFolder, file));
      }
    } else {
      const files = getFiles(path.join(controllerFolder, file));
      jsFiles.push(...files);
    }
  });

  return jsFiles;
}

module.exports = getFiles;
