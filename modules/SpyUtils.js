import invariant from './invariant'
import isFunction from './isFunction'

function noop() {}

export function createSpy(fn) {
  if (fn == null)
    fn = noop

  invariant(
    isFunction(fn),
    'createSpy needs a function'
  )

  let targetFn, thrownValue, returnValue

  const spy = function () {
    spy.calls.push({
      context: this,
      arguments: Array.prototype.slice.call(arguments, 0)
    })

    if (targetFn)
      return targetFn.apply(this, arguments)

    if (thrownValue)
      throw thrownValue

    return returnValue
  }

  spy.calls = []

  spy.andCall = function (fn) {
    targetFn = fn
    return spy
  }

  spy.andCallThrough = function () {
    return spy.andCall(fn)
  }

  spy.andThrow = function (object) {
    thrownValue = object
    return spy
  }

  spy.andReturn = function (value) {
    returnValue = value
    return spy
  }

  spy.getLastCall = function () {
    return spy.calls[spy.calls.length - 1]
  }

  spy.__isSpy = true

  return spy
}

export function spyOn(object, methodName) {
  const original = object[methodName]

  if (original == null || !original.__isSpy) {
    const spy = createSpy(original)

    spy.restore = spy.destroy = function () {
      object[methodName] = original
    }

    object[methodName] = spy
  }

  return object[methodName]
}
