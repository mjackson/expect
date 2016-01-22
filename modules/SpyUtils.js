import assert from './assert'
import { isFunction } from './TestUtils'

function noop() {}

let spies = []

export function createSpy(fn, restore=noop) {
  if (fn == null)
    fn = noop

  assert(
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

  spy.reset = function () {
    spy.calls = []
  }

  spy.restore = spy.destroy = restore

  spy.__isSpy = true

  spies.push(spy)

  return spy
}

export function spyOn(object, methodName) {
  const original = object[methodName]

  if (!isSpy(original)) {
    assert(
      isFunction(original),
      'Cannot spyOn the %s property; it is not a function',
      methodName
    )

    object[methodName] = createSpy(original, function () {
      object[methodName] = original
    })
  }

  return object[methodName]
}

export function isSpy(object) {
  return object && object.__isSpy === true
}

export function restoreSpies() {
  for (let i = spies.length - 1; i >= 0; i--)
    spies[i].restore()

  spies = []
}
