import isRegExp from 'is-regex'

/**
 * Returns true if the given object is a function.
 */
export const isFunction = (object) =>
  typeof object === 'function'

/**
 * Returns true if the given object is an array.
 */
export const isArray = (object) =>
  Array.isArray(object)

/**
 * Returns true if the given object is an object.
 */
export const isObject = (object) =>
  object && !isArray(object) && typeof object === 'object'

/**
 * Returns true if the given object is an instanceof value
 * or its typeof is the given value.
 */
export const isA = (object, value) => {
  if (isFunction(value))
    return object instanceof value

  if (value === 'array')
    return Array.isArray(object)

  return typeof object === value
}

/**
 * Returns true if the given function throws the given value
 * when invoked. The value may be:
 *
 * - undefined, to merely assert there was a throw
 * - a constructor function, for comparing using instanceof
 * - a regular expression, to compare with the error message
 * - a string, to find in the error message
 */
export const functionThrows = (fn, context, args, value) => {
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
export const arrayContains = (array, value, compareValues) =>
  array.some(item => compareValues(item, value) !== false)

/**
 * Returns true if the given object contains the value, false
 * otherwise. The compareValues function must return false to
 * indicate a non-match.
 */
export const objectContains = (object, value, compareValues) =>
  Object.keys(value).every(k => {
    if (isObject(object[k])) {
      return objectContains(object[k], value[k], compareValues)
    }

    return compareValues(object[k], value[k])
  })

/**
 * Returns true if the given string contains the value, false otherwise.
 */
export const stringContains = (string, value) =>
  string.indexOf(value) !== -1
