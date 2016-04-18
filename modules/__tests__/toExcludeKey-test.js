import expect from '../index'

describe('toExcludeKey', () => {
  it('requires the actual value to have keys', () => {
    expect(() => {
      expect(1).toExcludeKey('hello')
    }).toThrow(/must be an object/)
  })

  it('throws when there is a key that exists', () => {
    expect(() => {
      expect({ a: 1 }).toExcludeKey('a')
    }).toThrow(/exclude key/)
  })

  it('does not throw when there is a key that does not exist', () => {
    expect(() => {
      expect({ a: 1 }).toExcludeKey('b')
    }).toNotThrow()
  })
})
