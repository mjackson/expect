import expect from '../index'

describe('toBeTruthy', () => {
  it('does not throw on truthy actual values', () => {
    expect(() => {
      expect(1).toBeTruthy()
      expect({ hello: 'world' }).toBeTruthy()
      expect([ 1, 2, 3 ]).toBeTruthy()
    }).toNotThrow()
  })

  it('throws on falsy actual values', () => {
    expect(() => {
      expect(0).toBeTruthy()
    }).toThrow()

    expect(() => {
      expect(null).toBeTruthy()
    }).toThrow()

    expect(() => {
      expect(undefined).toBeTruthy()
    }).toThrow()
  })
})

describe('toBeFalsy', () => {
  it('throws on truthy values', () => {
    expect(() => {
      expect(42).toBeFalsy()
    }).toThrow()

    expect(() => {
      expect({ foo: 'bar' }).toBeFalsy()
    }).toThrow()

    expect(() => {
      expect([]).toBeFalsy()
    }).toThrow()
  })

  it('does not throw with falsy actual values', () => {
    expect(() => {
      expect(0).toBeFalsy()
      expect(null).toBeFalsy()
      expect(undefined).toBeFalsy()
    }).toNotThrow()
  })
})
