import Expectation from './Expectation'
import { createSpy, spyOn } from './SpyUtils'

function expect(actual) {
  return new Expectation(actual)
}

expect.createSpy = createSpy
expect.spyOn = spyOn

export default expect
