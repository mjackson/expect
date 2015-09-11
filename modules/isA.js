var isFunction = require('./isFunction');

/**
 * Returns true if the given object is an instanceof value
 * or its typeof is the given value.
 */
function isA(object, value) {
  return isFunction(value) ? object instanceof value : typeof object === value;
}

module.exports = isA;
