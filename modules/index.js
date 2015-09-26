import Expectation from './Expectation'
import { createSpy, spyOn, isSpy } from './SpyUtils'

function expect(actual) {
  return new Expectation(actual)
}

expect.createSpy = createSpy
expect.spyOn = spyOn
expect.isSpy = isSpy

export default expect
