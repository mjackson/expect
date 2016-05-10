import has from 'has'
import tmatch from 'tmatch'
import assert from './assert'
import { isSpy } from './SpyUtils'
import {
  isA,
  isFunction,
  isArray,
  isEqual,
  isObject,
  functionThrows,
  arrayContains,
  objectContains,
  stringContains
} from './TestUtils'

/**
 * An Expectation is a wrapper around an assertion that allows it to be written
 * in a more natural style, without the need to remember the order of arguments.
 * This helps prevent you from making mistakes when writing tests.
 */
class Expectation {
  constructor(actual) {
    this.actual = actual

    if (isFunction(actual)) {
      this.context = null
      this.args = []
    }
  }

  toExist(message) {
    assert(
      this.actual,
      (message || 'Expected %s to exist'),
      this.actual
    )

    return this
  }

  toNotExist(message) {
    assert(
      !this.actual,
      (message || 'Expected %s to not exist'),
      this.actual
    )

    return this
  }

  toBe(value, message) {
    assert(
      this.actual === value,
      (message || 'Expected %s to be %s'),
      this.actual,
      value
    )

    return this
  }

  toNotBe(value, message) {
    assert(
      this.actual !== value,
      (message || 'Expected %s to not be %s'),
      this.actual,
      value
    )

    return this
  }

  toEqual(value, message) {
    try {
      assert(
        isEqual(this.actual, value),
        (message || 'Expected %s to equal %s'),
        this.actual,
        value
      )
    } catch (error) {
      // These attributes are consumed by Mocha to produce a diff output.
      error.actual = this.actual
      error.expected = value
      error.showDiff = true
      throw error
    }

    return this
  }

  toNotEqual(value, message) {
    assert(
      !isEqual(this.actual, value),
      (message || 'Expected %s to not equal %s'),
      this.actual,
      value
    )

    return this
  }

  toThrow(value, message) {
    assert(
      isFunction(this.actual),
      'The "actual" argument in expect(actual).toThrow() must be a function, %s was given',
      this.actual
    )

    assert(
      functionThrows(this.actual, this.context, this.args, value),
      (message || 'Expected %s to throw %s'),
      this.actual,
      value || 'an error'
    )

    return this
  }

  toNotThrow(value, message) {
    assert(
      isFunction(this.actual),
      'The "actual" argument in expect(actual).toNotThrow() must be a function, %s was given',
      this.actual
    )

    assert(
      !functionThrows(this.actual, this.context, this.args, value),
      (message || 'Expected %s to not throw %s'),
      this.actual,
      value || 'an error'
    )

    return this
  }

  toBeA(value, message) {
    assert(
      isFunction(value) || typeof value === 'string',
      'The "value" argument in toBeA(value) must be a function or a string'
    )

    assert(
      isA(this.actual, value),
      (message || 'Expected %s to be a %s'),
      this.actual,
      value
    )

    return this
  }

  toNotBeA(value, message) {
    assert(
      isFunction(value) || typeof value === 'string',
      'The "value" argument in toNotBeA(value) must be a function or a string'
    )

    assert(
      !isA(this.actual, value),
      (message || 'Expected %s to be a %s'),
      this.actual,
      value
    )

    return this
  }

  toMatch(pattern, message) {
    assert(
      tmatch(this.actual, pattern),
      (message || 'Expected %s to match %s'),
      this.actual,
      pattern
    )

    return this
  }

  toNotMatch(pattern, message) {
    assert(
      !tmatch(this.actual, pattern),
      (message || 'Expected %s to not match %s'),
      this.actual,
      pattern
    )

    return this
  }

  toBeLessThan(value, message) {
    assert(
      typeof this.actual === 'number',
      'The "actual" argument in expect(actual).toBeLessThan() must be a number'
    )

    assert(
      typeof value === 'number',
      'The "value" argument in toBeLessThan(value) must be a number'
    )

    assert(
      this.actual < value,
      (message || 'Expected %s to be less than %s'),
      this.actual,
      value
    )

    return this
  }

  toBeLessThanOrEqualTo(value, message) {
    assert(
      typeof this.actual === 'number',
      'The "actual" argument in expect(actual).toBeLessThanOrEqualTo() must be a number'
    )

    assert(
      typeof value === 'number',
      'The "value" argument in toBeLessThanOrEqualTo(value) must be a number'
    )

    assert(
      this.actual <= value,
      (message || 'Expected %s to be less than or equal to %s'),
      this.actual,
      value
    )

    return this
  }

  toBeGreaterThan(value, message) {
    assert(
      typeof this.actual === 'number',
      'The "actual" argument in expect(actual).toBeGreaterThan() must be a number'
    )

    assert(
      typeof value === 'number',
      'The "value" argument in toBeGreaterThan(value) must be a number'
    )

    assert(
      this.actual > value,
      (message || 'Expected %s to be greater than %s'),
      this.actual,
      value
    )

    return this
  }

  toBeGreaterThanOrEqualTo(value, message) {
    assert(
      typeof this.actual === 'number',
      'The "actual" argument in expect(actual).toBeGreaterThanOrEqualTo() must be a number'
    )

    assert(
      typeof value === 'number',
      'The "value" argument in toBeGreaterThanOrEqualTo(value) must be a number'
    )

    assert(
      this.actual >= value,
      (message || 'Expected %s to be greater than or equal to %s'),
      this.actual,
      value
    )

    return this
  }

  toInclude(value, compareValues, message) {
    if (typeof compareValues === 'string') {
      message = compareValues
      compareValues = null
    }

    if (compareValues == null)
      compareValues = isEqual

    let contains = false

    if (isArray(this.actual)) {
      contains = arrayContains(this.actual, value, compareValues)
    } else if (isObject(this.actual)) {
      contains = objectContains(this.actual, value, compareValues)
    } else if (typeof this.actual === 'string') {
      contains = stringContains(this.actual, value)
    } else {
      assert(
        false,
        'The "actual" argument in expect(actual).toInclude() must be an array, object, or a string'
      )
    }

    assert(
      contains,
      message || 'Expected %s to include %s',
      this.actual,
      value
    )

    return this
  }

  toExclude(value, compareValues, message) {
    if (typeof compareValues === 'string') {
      message = compareValues
      compareValues = null
    }

    if (compareValues == null)
      compareValues = isEqual

    let contains = false

    if (isArray(this.actual)) {
      contains = arrayContains(this.actual, value, compareValues)
    } else if (isObject(this.actual)) {
      contains = objectContains(this.actual, value, compareValues)
    } else if (typeof this.actual === 'string') {
      contains = stringContains(this.actual, value)
    } else {
      assert(
        false,
        'The "actual" argument in expect(actual).toExclude() must be an array, object, or a string'
      )
    }

    assert(
      !contains,
      message || 'Expected %s to exclude %s',
      this.actual,
      value
    )

    return this
  }

  toIncludeKeys(keys, comparator, message) {
    if (typeof comparator === 'string') {
      message = comparator
      comparator = null
    }

    if (comparator == null)
      comparator = has

    assert(
      typeof this.actual === 'object',
      'The "actual" argument in expect(actual).toIncludeKeys() must be an object, not %s',
      this.actual
    )

    assert(
      isArray(keys),
      'The "keys" argument in expect(actual).toIncludeKeys(keys) must be an array, not %s',
      keys
    )

    const contains = keys.every(key => comparator(this.actual, key))

    assert(
      contains,
      message || 'Expected %s to include key(s) %s',
      this.actual,
      keys.join(', ')
    )

    return this
  }

  toIncludeKey(key, ...args) {
    return this.toIncludeKeys([ key ], ...args)
  }

  toExcludeKeys(keys, comparator, message) {
    if (typeof comparator === 'string') {
      message = comparator
      comparator = null
    }

    if (comparator == null)
      comparator = has

    assert(
      typeof this.actual === 'object',
      'The "actual" argument in expect(actual).toExcludeKeys() must be an object, not %s',
      this.actual
    )

    assert(
      isArray(keys),
      'The "keys" argument in expect(actual).toIncludeKeys(keys) must be an array, not %s',
      keys
    )

    const contains = keys.every(key => comparator(this.actual, key))

    assert(
      !contains,
      message || 'Expected %s to exclude key(s) %s',
      this.actual,
      keys.join(', ')
    )

    return this
  }

  toExcludeKey(key, ...args) {
    return this.toExcludeKeys([ key ], ...args)
  }

  toHaveBeenCalled(message) {
    const spy = this.actual

    assert(
      isSpy(spy),
      'The "actual" argument in expect(actual).toHaveBeenCalled() must be a spy'
    )

    assert(
      spy.calls.length > 0,
      (message || 'spy was not called')
    )

    return this
  }

  toHaveBeenCalledWith(...expectedArgs) {
    const spy = this.actual

    assert(
      isSpy(spy),
      'The "actual" argument in expect(actual).toHaveBeenCalledWith() must be a spy'
    )

    assert(
      spy.calls.some(call => isEqual(call.arguments, expectedArgs)),
      'spy was never called with %s',
      expectedArgs
    )

    return this
  }

  toNotHaveBeenCalled(message) {
    const spy = this.actual

    assert(
      isSpy(spy),
      'The "actual" argument in expect(actual).toNotHaveBeenCalled() must be a spy'
    )

    assert(
      spy.calls.length === 0,
      (message || 'spy was not supposed to be called')
    )

    return this
  }
}

const deprecate = (fn, message) => {
  let alreadyWarned = false

  return function (...args) {
    if (!alreadyWarned) {
      alreadyWarned = true
      console.warn(message)
    }

    return fn.apply(this, args)
  }
}

Expectation.prototype.withContext = deprecate(function (context) {
  assert(
    isFunction(this.actual),
    'The "actual" argument in expect(actual).withContext() must be a function'
  )

  this.context = context

  return this
}, `
withContext is deprecated; use a closure instead.

  expect(fn).withContext(context).toThrow()

becomes

  expect(() => fn.call(context)).toThrow()
`)

Expectation.prototype.withArgs = deprecate(function (...args) {
  assert(
    isFunction(this.actual),
    'The "actual" argument in expect(actual).withArgs() must be a function'
  )

  if (args.length)
    this.args = this.args.concat(...args)

  return this
}, `
withArgs is deprecated; use a closure instead.

  expect(fn).withArgs(a, b, c).toThrow()

becomes

  expect(() => fn(a, b, c)).toThrow()
`)

const aliases = {
  toBeAn: 'toBeA',
  toNotBeAn: 'toNotBeA',
  toBeTruthy: 'toExist',
  toBeFalsy: 'toNotExist',
  toBeFewerThan: 'toBeLessThan',
  toBeMoreThan: 'toBeGreaterThan',
  toContain: 'toInclude',
  toNotContain: 'toExclude',
  toNotInclude: 'toExclude',
  toContainKeys: 'toIncludeKeys',
  toNotContainKeys: 'toExcludeKeys',
  toNotIncludeKeys: 'toExcludeKeys',
  toContainKey: 'toIncludeKey',
  toNotContainKey: 'toExcludeKey',
  toNotIncludeKey: 'toExcludeKey'
}

for (const alias in aliases)
  if (aliases.hasOwnProperty(alias))
    Expectation.prototype[alias] = Expectation.prototype[aliases[alias]]

export default Expectation
