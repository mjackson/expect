import Expectation from './Expectation'
import { createSpy, spyOn, isSpy, restoreSpies } from './SpyUtils'
import invariant from './invariant'
import extend from './extend'

function expect(actual) {
  return new Expectation(actual)
}

expect.createSpy = createSpy
expect.spyOn = spyOn
expect.isSpy = isSpy
expect.restoreSpies = restoreSpies
expect.assert = invariant
expect.extend = extend

export default expect
