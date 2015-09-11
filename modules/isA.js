var isFunction = require('./isFunction');

/**
 * Returns true if the given object is an instanceof value
 * or its typeof is the given value.
 */
function isA(object, value) {
  if (isFunction(value))
    return object instanceof value;

  if (value === 'array')
    return Array.isArray(object);

  return typeof object === value;
}

module.exports = isA;
