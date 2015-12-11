import isEqual from 'is-equal'
import isRegExp from 'is-regex'

/**
 * Returns true if the given function throws the given value
 * when invoked. The value may be:
 *
 * - undefined, to merely assert there was a throw
 * - a constructor function, for comparing using instanceof
 * - a regular expression, to compare with the error message
 * - a string, to find in the error message
 */
export function functionThrows(fn, context, args, value) {
  try {
    fn.apply(context, args)
  } catch (error) {
    if (value == null)
      return true

    if (isFunction(value) && error instanceof value)
      return true

    const message = error.message || error

    if (typeof message === 'string') {
      if (isRegExp(value) && value.test(error.message))
        return true

      if (typeof value === 'string' && message.indexOf(value) !== -1)
        return true
    }
  }

  return false
}

/**
 * Returns true if the given array contains the value, false
 * otherwise. The compareValues function must return false to
 * indicate a non-match.
 */
export function arrayContains(array, value, compareValues) {
  if (compareValues == null)
    compareValues = isEqual

  return array.some(function (item) {
    return compareValues(item, value) !== false
  })
}

/**
 * Returns true if the given string contains the value, false otherwise.
 */
export function stringContains(string, value) {
  return string.indexOf(value) !== -1
}

/**
 * Returns true if the given object is an array.
 */
export function isArray(object) {
  return Array.isArray(object)
}

/**
 * Returns true if the given object is a function.
 */
export function isFunction(object) {
  return typeof object === 'function'
}

/**
 * Returns true if the given object is an instanceof value
 * or its typeof is the given value.
 */
export function isA(object, value) {
  if (isFunction(value))
    return object instanceof value

  if (value === 'array')
    return Array.isArray(object)

  return typeof object === value
}
