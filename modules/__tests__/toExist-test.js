import expect from '../index'

describe('toExist', () => {
  it('does not throw on truthy actual values', () => {
    expect(() => {
      expect(1).toExist()
      expect({ hello: 'world' }).toExist()
      expect([ 1, 2, 3 ]).toExist()
    }).toNotThrow()
  })

  it('throws on falsy actual values', () => {
    expect(() => {
      expect(0).toExist()
    }).toThrow()

    expect(() => {
      expect(null).toExist()
    }).toThrow()

    expect(() => {
      expect(undefined).toExist()
    }).toThrow()
  })
})

describe('toNotExist', () => {
  it('throws on truthy values', () => {
    expect(() => {
      expect(42).toNotExist()
    }).toThrow()

    expect(() => {
      expect({ foo: 'bar' }).toNotExist()
    }).toThrow()

    expect(() => {
      expect([]).toNotExist()
    }).toThrow()
  })

  it('does not throw with falsy actual values', () => {
    expect(() => {
      expect(0).toNotExist()
      expect(null).toNotExist()
      expect(undefined).toNotExist()
    }).toNotThrow()
  })
})
