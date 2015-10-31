/*eslint-env mocha */
import expect from '../index'

describe('toExist', function () {
  it('does not throw on truthy actual values', function () {
    expect(function () {
      expect(1).toExist()
      expect({ 'hello': 'world' }).toExist()
      expect([ 1, 2, 3 ]).toExist()
    }).toNotThrow()
  })

  it('throws on falsy actual values', function () {
    expect(function () {
      expect(0).toExist()
    }).toThrow()

    expect(function () {
      expect(null).toExist()
    }).toThrow()

    expect(function () {
      expect(undefined).toExist()
    }).toThrow()
  })
})

describe('toNotExist', function () {
  it('throws on truthy values', function () {
    expect(function () {
      expect(42).toNotExist()
    }).toThrow()

    expect(function () {
      expect({ foo: 'bar' }).toNotExist()
    }).toThrow()

    expect(function () {
      expect([]).toNotExist()
    }).toThrow()
  })

  it('does not throw with falsy actual values', function () {
    expect(function () {
      expect(0).toNotExist()
      expect(null).toNotExist()
      expect(undefined).toNotExist()
    }).toNotThrow()
  })
})
