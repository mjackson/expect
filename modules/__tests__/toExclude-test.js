import expect from '../index'

describe('toExclude', () => {
  it('requires the actual value to be an array or string', () => {
    expect(() => {
      expect(1).toExclude(2)
    }).toThrow(/must be an array, object, or a string/)
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

  it('throws when an object contains an expected object', () => {
    expect(() => {
      expect({ a: 1 }).toExclude({ a: 1 })
    }).toThrow(/to exclude/)
  })

  it('does not throw when an array contains an unexpected object', () => {
    expect(() => {
      expect({ a: 1 }).toExclude({ b: 2 })
    }).toNotThrow()
  })

  it('does not throw when an object contains an expected object with an unexpected value', () => {
    expect(() => {
      expect({ a: 1 }).toExclude({ a: 2 })
    }).toNotThrow()
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
