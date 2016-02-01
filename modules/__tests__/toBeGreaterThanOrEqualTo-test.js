/*eslint-env mocha */
import expect from '../index'

describe('toBeGreaterThanOrEqualTo', function () {
  it('does not throw when the actual value is greater than the expected value', function () {
    expect(function () {
      expect(3).toBeGreaterThanOrEqualTo(2)
    }).toNotThrow()
  })

  it('does not throw when the actual value is equal to the expected value', function () {
    expect(function () {
      expect(3).toBeGreaterThanOrEqualTo(3)
    }).toNotThrow()
  })

  it('throws when the actual value is not greater than or equal to the expected value', function () {
    expect(function () {
      expect(2).toBeGreaterThanOrEqualTo(3)
    }).toThrow(/to be greater than or equal to/)
  })
})
