/* eslint-disable prefer-rest-params */
import { supportsDescriptors } from 'define-properties'
import assert from './assert'
import { isFunction } from './TestUtils'

const noop = () => {}

const supportsConfigurableFnLength = supportsDescriptors &&
  Object.getOwnPropertyDescriptor(() => {}, 'length').configurable

export const isSpy = (object) =>
  object && object.__isSpy === true

let spies = []

export const restoreSpies = () => {
  for (let i = spies.length - 1; i >= 0; i--)
    spies[i].restore()

  spies = []
}

export const createSpy = (fn, restore = noop) => {
  if (fn == null)
    fn = noop

  assert(
    isFunction(fn),
    'createSpy needs a function'
  )

  let targetFn, thrownValue, returnValue, spy

  function spyLogic() {
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

  if (supportsConfigurableFnLength) {
    spy = Object.defineProperty(spyLogic, 'length',
      { value: fn.length, writable: false, enumerable: false, configurable: true })
  } else {
    spy = new Function('spy', `return function(${ // eslint-disable-line no-new-func
      [ ...Array(fn.length) ].map((_, i) => `_${i}`).join(',')
    }) {
      return spy.apply(this, arguments)
    }`)(spyLogic)
  }

  spy.calls = []

  spy.andCall = (otherFn) => {
    targetFn = otherFn
    return spy
  }

  spy.andCallThrough = () =>
    spy.andCall(fn)

  spy.andThrow = (value) => {
    thrownValue = value
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

export const spyOn = (object, methodName) => {
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
