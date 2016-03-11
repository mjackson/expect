/* eslint-disable prefer-rest-params */
import assert from './assert'
import { isFunction } from './TestUtils'

const noop = () => {}

export const isSpy = (object) =>
  object && object.__isSpy === true

let spies = []

export const restoreSpies = () => {
  for (let i = spies.length - 1; i >= 0; i--)
    spies[i].restore()

  spies = []
}

export function createSpy(fn, restore = noop) {
  if (fn == null)
    fn = noop

  assert(
    isFunction(fn),
    'createSpy needs a function'
  )

  let targetFn, thrownValue, returnValue

  const spy = function spy() {
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

  spy.andCall = (otherFn) => {
    targetFn = otherFn
    return spy
  }

  spy.andCallThrough = () =>
    spy.andCall(fn)

  spy.andThrow = (object) => {
    thrownValue = object
    return spy
  }

  spy.andReturn = (value) => {
    returnValue = value
    return spy
  }

  spy.getLastCall = () =>
    spy.calls[spy.calls.length - 1]

  spy.reset = () => {
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

    object[methodName] = createSpy(original, () => {
      object[methodName] = original
    })
  }

  return object[methodName]
}
