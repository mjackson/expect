import expect from '../index'

describe('toExcludeKeys', () => {
  it('requires the actual value to have keys', () => {
    expect(() => {
      expect(1).toExcludeKeys('hello')
    }).toThrow(/must be an object/)
  })

  it('throws when there is a key that exists', () => {
    expect(() => {
      expect({ a: 1 }).toExcludeKeys([ 'a' ])
    }).toThrow(/exclude key/)
  })

  it('does not throw when there is a key that does not exist', () => {
    expect(() => {
      expect({ a: 1 }).toExcludeKeys([ 'b' ])
    }).toNotThrow()
  })

  it('throws when all keys exist', () => {
    expect(() => {
      expect({ a: 1, b: 2, c: 3 }).toExcludeKeys([ 'a', 'b', 'c' ])
    }).toThrow(/exclude key/)
  })

  it('does not throw when even one key does not exist', () => {
    expect(() => {
      expect({ a: 1, c: 3 }).toExcludeKeys([ 'a', 'b', 'c' ])
    }).toNotThrow()
  })

  it('works with arrays', () => {
    expect(() => {
      expect([ 0, 1, 2 ]).toExcludeKeys([ '0', 1, 2 ])
    }).toThrow(/exclude key/)

    expect(() => {
      expect([ 0, 1, 2 ]).toExcludeKeys([ 3 ])
    }).toNotThrow()
  })

  it('allows a single key to be passed', () => {
    expect(() => {
      expect({ a: 1 }).toExcludeKeys('a')
    }).toThrow(/exclude key/)

    expect(() => {
      expect({ a: 1 }).toExcludeKeys('b')
    }).toNotThrow()
  })
})
