import Expectation from './Expectation'
import { createSpy, spyOn, isSpy, restoreSpies } from './SpyUtils'

function expect(actual) {
  return new Expectation(actual)
}

expect.createSpy = createSpy
expect.spyOn = spyOn
expect.isSpy = isSpy
expect.restoreSpies = restoreSpies

export default expect
