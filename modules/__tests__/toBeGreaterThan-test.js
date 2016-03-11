import expect from '../index'

describe('toBeGreaterThan', () => {
  it('does not throw when the actual value is greater than the expected value', () => {
    expect(() => {
      expect(3).toBeGreaterThan(2)
    }).toNotThrow()
  })

  it('throws when the actual value is not greater than the expected value', () => {
    expect(() => {
      expect(2).toBeGreaterThan(3)
    }).toThrow(/to be greater than/)
  })
})
