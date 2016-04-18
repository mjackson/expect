import expect from '../index'

describe('toIncludeKey', () => {
  it('requires the actual value to have keys', () => {
    expect(() => {
      expect(1).toIncludeKey('hello')
    }).toThrow(/must be an object/)
  })

  it('does not throw when there is a key that exists', () => {
    expect(() => {
      expect({ a: 1 }).toIncludeKey('a')
    }).toNotThrow()
  })

  it('throws when there is a key that does not exist', () => {
    expect(() => {
      expect({ a: 1 }).toIncludeKey('b')
    }).toThrow(/include key/)
  })
})
