/*eslint-env mocha */
import expect from '../index'

describe('toBeLessThanOrEqualTo', function () {
  it('does not throw when the actual value is less than the expected value', function () {
    expect(function () {
      expect(2).toBeLessThanOrEqualTo(3)
    }).toNotThrow()
  })

  it('does not throw when the actual value is equal to the expected value', function () {
    expect(function () {
      expect(2).toBeLessThanOrEqualTo(2)
    }).toNotThrow()
  })

  it('throws when the actual value is not less than the expected value', function () {
    expect(function () {
      expect(3).toBeLessThanOrEqualTo(2)
    }).toThrow(/to be less than or equal to/)
  })
})
