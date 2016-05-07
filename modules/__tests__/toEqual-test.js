import expect from '../index'

describe('toEqual', () => {
  it('works', () => {
    expect('actual').toEqual('actual')
  })

  it('works with numbers and strings that have the same conceptual value', () => {
    expect(2).toEqual('2')
  })

  it('works with null and undefined', () => {
    expect(null).toEqual(undefined)
  })

  it('works with objects that have the same keys in different order', () => {
    const a = { a: 'a', b: 'b', c: 'c' }
    const b = { b: 'b', c: 'c', a: 'a' }
    expect(a).toEqual(b)
  })

  it('works when object has circular reference', () => {
    function Circular() {
      this.circularRef = this
    }

    const a = new Circular()
    const b = new Circular()

    expect(a).toEqual(b)
  })

  if (typeof Map !== 'undefined') {
    it('works with Map', () => {
      const a = new Map()
      a.set('key', 'value')

      const b = new Map()
      b.set('key', 'value')

      expect(a).toEqual(b)
    })
  }

  if (typeof Set !== 'undefined') {
    it('works with Set', () => {
      const a = new Set()
      a.add('a')

      const b = new Set()
      b.add('a')

      expect(a).toEqual(b)
    })
  }

  it('shows diff', () => {
    try {
      expect('actual').toEqual('expected')
    } catch (err) {
      expect(err.actual).toEqual('actual')
      expect(err.expected).toEqual('expected')
      expect(err.showDiff).toEqual(true)
    }
  })
})
