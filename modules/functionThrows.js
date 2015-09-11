var isRegExp = require('is-regexp');
var isFunction = require('./isFunction');

/**
 * Returns true if the given function throws the given value
 * when invoked. The value may be:
 *
 * - undefined, to merely assert there was a throw
 * - a constructor function, for comparing using instanceof
 * - a regular expression, to compare with the error message
 * - a string, to find in the error message
 */
function functionThrows(fn, context, args, value) {
  try {
    fn.apply(context, args);
  } catch (error) {
    if (value == null)
      return true;

    if (isFunction(value) && error instanceof value)
      return true;

    var message = error.message || error;

    if (typeof message === 'string') {
      if (isRegExp(value) && value.test(error.message))
        return true;
      
      if (typeof value === 'string' && message.indexOf(value) !== -1)
        return true;
    }
  }

  return false;
}

module.exports = functionThrows;
