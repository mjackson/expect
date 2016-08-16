import Expectation from './Expectation'
import { createSpy, spyOn, isSpy, restoreSpies } from './SpyUtils'
import assert from './assert'
import extend from './extend'

function expect(actual) {
  return new Expectation(actual)
}

expect.createSpy = createSpy
expect.spyOn = spyOn
expect.isSpy = isSpy
expect.restoreSpies = restoreSpies
expect.assert = assert
expect.extend = extend

export default expect
