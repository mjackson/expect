import deepEqual from 'deep-equal'
import isRegExp from 'is-regexp'
import invariant from './invariant'
import isFunction from './isFunction'
import functionThrows from './functionThrows'
import stringContains from './stringContains'
import arrayContains from './arrayContains'
import { isSpy } from './SpyUtils'
import isA from './isA'

const isArray = Array.isArray

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
    invariant(
      this.actual,
      (message || 'Expected %s to exist'),
      this.actual
    )

    return this
  }

  toNotExist(message) {
    invariant(
      !this.actual,
      (message || 'Expected %s to not exist'),
      this.actual
    )

    return this
  }

  toBe(value, message) {
    invariant(
      this.actual === value,
      (message || 'Expected %s to be %s'),
      this.actual,
      value
    )

    return this
  }

  toNotBe(value, message) {
    invariant(
      this.actual !== value,
      (message || 'Expected %s to not be %s'),
      this.actual,
      value
    )

    return this
  }

  toEqual(value, message) {
    invariant(
      deepEqual(this.actual, value),
      (message || 'Expected %s to equal %s'),
      this.actual,
      value
    )

    return this
  }

  toNotEqual(value, message) {
    invariant(
      !deepEqual(this.actual, value),
      (message || 'Expected %s to not equal %s'),
      this.actual,
      value
    )

    return this
  }

  toThrow(value, message) {
    invariant(
      isFunction(this.actual),
      'The "actual" argument in expect(actual).toThrow() must be a function, %s was given',
      this.actual
    )

    invariant(
      functionThrows(this.actual, this.context, this.args, value),
      (message || 'Expected %s to throw %s'),
      this.actual,
      value
    )

    return this
  }

  toNotThrow(value, message) {
    invariant(
      isFunction(this.actual),
      'The "actual" argument in expect(actual).toNotThrow() must be a function, %s was given',
      this.actual
    )

    invariant(
      !functionThrows(this.actual, this.context, this.args, value),
      (message || 'Expected %s to not throw %s'),
      this.actual,
      value
    )

    return this
  }

  toBeA(value, message) {
    invariant(
      isFunction(value) || typeof value === 'string',
      'The "value" argument in toBeA(value) must be a function or a string'
    )

    invariant(
      isA(this.actual, value),
      (message || 'Expected %s to be a %s'),
      this.actual,
      value
    )

    return this
  }

  toNotBeA(value, message) {
    invariant(
      isFunction(value) || typeof value === 'string',
      'The "value" argument in toNotBeA(value) must be a function or a string'
    )

    invariant(
      !isA(this.actual, value),
      (message || 'Expected %s to be a %s'),
      this.actual,
      value
    )

    return this
  }

  toMatch(pattern, message) {
    invariant(
      typeof this.actual === 'string',
      'The "actual" argument in expect(actual).toMatch() must be a string'
    )

    invariant(
      isRegExp(pattern),
      'The "value" argument in toMatch(value) must be a RegExp'
    )

    invariant(
      pattern.test(this.actual),
      (message || 'Expected %s to match %s'),
      this.actual,
      pattern
    )

    return this
  }

  toNotMatch(pattern, message) {
    invariant(
      typeof this.actual === 'string',
      'The "actual" argument in expect(actual).toNotMatch() must be a string'
    )

    invariant(
      isRegExp(pattern),
      'The "value" argument in toNotMatch(value) must be a RegExp'
    )

    invariant(
      !pattern.test(this.actual),
      (message || 'Expected %s to not match %s'),
      this.actual,
      pattern
    )

    return this
  }

  toBeLessThan(value, message) {
    invariant(
      typeof this.actual === 'number',
      'The "actual" argument in expect(actual).toBeLessThan() must be a number'
    )

    invariant(
      typeof value === 'number',
      'The "value" argument in toBeLessThan(value) must be a number'
    )

    invariant(
      this.actual < value,
      (message || 'Expected %s to be less than %s'),
      this.actual,
      value
    )

    return this
  }

  toBeGreaterThan(value, message) {
    invariant(
      typeof this.actual === 'number',
      'The "actual" argument in expect(actual).toBeGreaterThan() must be a number'
    )

    invariant(
      typeof value === 'number',
      'The "value" argument in toBeGreaterThan(value) must be a number'
    )

    invariant(
      this.actual > value,
      (message || 'Expected %s to be greater than %s'),
      this.actual,
      value
    )

    return this
  }

  toInclude(value, comparator, message) {
    invariant(
      isArray(this.actual) || typeof this.actual === 'string',
      'The "actual" argument in expect(actual).toInclude() must be an array or a string'
    )

    if (typeof comparator === 'string') {
      message = comparator
      comparator = null
    }

    message = message || 'Expected %s to include %s'

    if (isArray(this.actual)) {
      invariant(
        arrayContains(this.actual, value, comparator),
        message,
        this.actual,
        value
      )
    } else {
      invariant(
        stringContains(this.actual, value),
        message,
        this.actual,
        value
      )
    }

    return this
  }

  toExclude(value, comparator, message) {
    invariant(
      isArray(this.actual) || typeof this.actual === 'string',
      'The "actual" argument in expect(actual).toExclude() must be an array or a string'
    )

    if (typeof comparator === 'string') {
      message = comparator
      comparator = null
    }

    message = message || 'Expected %s to exclude %s'

    if (isArray(this.actual)) {
      invariant(
        !arrayContains(this.actual, value, comparator),
        message,
        this.actual,
        value
      )
    } else {
      invariant(
        !stringContains(this.actual, value),
        message,
        this.actual,
        value
      )
    }

    return this
  }

  toHaveBeenCalled(message) {
    const spy = this.actual

    invariant(
      isSpy(spy),
      'The "actual" argument in expect(actual).toHaveBeenCalled() must be a spy'
    )

    invariant(
      spy.calls.length > 0,
      (message || 'spy was not called')
    )

    return this
  }

  toHaveBeenCalledWith() {
    const spy = this.actual

    invariant(
      isSpy(spy),
      'The "actual" argument in expect(actual).toHaveBeenCalledWith() must be a spy'
    )

    const expectedArgs = Array.prototype.slice.call(arguments, 0)

    invariant(
      spy.calls.some(function (call) {
        return deepEqual(call.arguments, expectedArgs)
      }),
      'spy was never called with %s',
      expectedArgs
    )

    return this
  }

  toNotHaveBeenCalled(message) {
    const spy = this.actual

    invariant(
      isSpy(spy),
      'The "actual" argument in expect(actual).toNotHaveBeenCalled() must be a spy'
    )

    invariant(
      spy.calls.length === 0,
      (message || 'spy was not supposed to be called')
    )

    return this
  }

  withContext(context) {
    invariant(
      isFunction(this.actual),
      'The "actual" argument in expect(actual).withContext() must be a function'
    )

    this.context = context

    return this
  }

  withArgs() {
    invariant(
      isFunction(this.actual),
      'The "actual" argument in expect(actual).withArgs() must be a function'
    )

    if (arguments.length)
      this.args = this.args.concat(Array.prototype.slice.call(arguments, 0))

    return this
  }
  
}

const aliases = {
  toBeAn: 'toBeA',
  toNotBeAn: 'toNotBeA',
  toBeTruthy: 'toExist',
  toBeFalsy: 'toNotExist',
  toBeFewerThan: 'toBeLessThan',
  toBeMoreThan: 'toBeGreaterThan',
  toContain: 'toInclude',
  toNotContain: 'toExclude'
}

for (let alias in aliases)
  Expectation.prototype[alias] = Expectation.prototype[aliases[alias]]

export default Expectation
