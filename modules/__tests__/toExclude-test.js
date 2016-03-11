import expect from '../index'

describe('toExclude', () => {
  it('requires the actual value to be an array or string', () => {
    expect(() => {
      expect(1).toExclude(2)
    }).toThrow(/must be an array or a string/)
  })

  it('does not throw when an array does not contain the expected value', () => {
    expect(() => {
      expect([ 1, 2, 3 ]).toExclude(4)
    }).toNotThrow()
  })

  it('throws when an array contains the expected value', () => {
    expect(() => {
      expect([ 1, 2, 3 ]).toExclude(2)
    }).toThrow(/to exclude/)
  })

  it('does not throw when an array does not contain the expected value', () => {
    expect(() => {
      expect('hello world').toExclude('goodbye')
    }).toNotThrow()
  })

  it('throws when a string contains the expected value', () => {
    expect(() => {
      expect('hello world').toExclude('hello')
    }).toThrow(/to exclude/)
  })
})
