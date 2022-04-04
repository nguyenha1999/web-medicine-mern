/** Determine arguments' names of the function.
 *
 * @param function func - a function which you want to determine its arguments' names.
 *
 * @return array of string - The list of arguments' names.
 */
function getArgs(func) {
  // First match everything inside the function argument parens.
  const stringFunc = func.toString();
  let args = null;

  const tmp = stringFunc.match(/function\s?.*?\(([^)]*)\)/); // f or function declaration
  if (tmp) args = tmp[1];
  else {
    args = stringFunc.match(/^\(([^)]*)\).*/)[1]; // for lambda function
  }

  // delete /* */ comments
  args = args.trim().replace(/\/\*(?:(?!\*\/)(.|\n))+\*\//g, '');
  // arg.replace(/\/\*.*\*\//, '').trim();

  // delete // comments
  args = args.replace(/\/\/[^\n]*\n/g, '');

  // Split the arguments string into an array comma delimited.
  return args
    .split(',')
    .map((arg) => arg.trim())
    .map((arg) => {
      // delete default values
      if (arg.indexOf('=') > 0) {
        return arg.substring(0, arg.indexOf('=')).trim();
      }
      return arg;
    })
    .filter((arg) => arg); // console.log(arg==='undefined');//true.
  // Ensure no undefined values are added.
}

module.exports = getArgs;
