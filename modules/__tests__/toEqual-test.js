/*eslint-env mocha */
import expect from '../index'

describe('toEqual', function () {
  it('works', function () {
    expect(function () {
      expect('actual').toEqual('expected')
    }).toThrow(/Expected 'actual' to equal 'expected'/)
  })

  it('works with objects that have the same keys in different order', function () {
    const a = { a: 'a', b: 'b', c: 'c' }
    const b = { b: 'b', c: 'c', a: 'a' }
    expect(a).toEqual(b)
  })

  it('works when object has circular reference' , function () {
    function circular() {
      this.circularRef = this
    }

    const a = new circular()
    const b = new circular()

    expect(a).toEqual(b)
  })

  it('works with Map', function () {
    const a = new Map()
    a.set('key', 'value')

    const b = new Map()
    b.set('key', 'value')

    expect(a).toEqual(b)
  })

  it('works with Set', function () {
    const a = new Set('a')
    const b = new Set('a')
    expect(a).toEqual(b)
  })

  it('shows diff', function () {
    try {
      expect('actual').toEqual('expected')
    } catch (err) {
      expect(err.actual).toEqual('actual')
      expect(err.expected).toEqual('expected')
      expect(err.showDiff).toEqual(true)
    }
  })
})
