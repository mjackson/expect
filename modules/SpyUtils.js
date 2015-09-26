import invariant from './invariant'
import isFunction from './isFunction'

function noop() {}

export function createSpy(fn, destroy=noop) {
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

  spy.destroy = spy.restore = destroy

  spy.__isSpy = true

  return spy
}

export function spyOn(object, methodName) {
  const original = object[methodName]

  if (!isSpy(original)) {
    object[methodName] = createSpy(original, function () {
      object[methodName] = original
    })
  }

  return object[methodName]
}

export function isSpy(object) {
  return object && object.__isSpy === true
}
