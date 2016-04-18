import expect from '../index'

describe('toIncludeKeys', () => {
  it('requires the actual value to have keys', () => {
    expect(() => {
      expect(1).toIncludeKeys([ 'hello' ])
    }).toThrow(/must be an object/)
  })

  it('does not throw when there is a key that exists', () => {
    expect(() => {
      expect({ a: 1 }).toIncludeKeys([ 'a' ])
    }).toNotThrow()
  })

  it('throws when there is a key that does not exist', () => {
    expect(() => {
      expect({ a: 1 }).toIncludeKeys([ 'b' ])
    }).toThrow(/include key/)
  })

  it('does not throw when all keys exist', () => {
    expect(() => {
      expect({ a: 1, b: 2, c: 3 }).toIncludeKeys([ 'a', 'b', 'c' ])
    }).toNotThrow()
  })

  it('throws when even one key does not exist', () => {
    expect(() => {
      expect({ a: 1, c: 3 }).toIncludeKeys([ 'a', 'b', 'c' ])
    }).toThrow(/include key/)
  })

  it('works with arrays', () => {
    expect(() => {
      expect([ 0, 1, 2 ]).toIncludeKeys([ '0', 1, 2 ])
    }).toNotThrow()

    expect(() => {
      expect([ 0, 1, 2 ]).toIncludeKeys([ 3 ])
    }).toThrow(/include key/)
  })
})
