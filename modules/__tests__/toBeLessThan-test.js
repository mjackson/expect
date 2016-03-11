import expect from '../index'

describe('toBeLessThan', () => {
  it('does not throw when the actual value is less than the expected value', () => {
    expect(() => {
      expect(2).toBeLessThan(3)
    }).toNotThrow()
  })

  it('throws when the actual value is not less than the expected value', () => {
    expect(() => {
      expect(3).toBeLessThan(2)
    }).toThrow(/to be less than/)
  })
})
