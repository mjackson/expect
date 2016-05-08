import expect from '../index'

describe('toNotEqual', () => {
  it('works', () => {
    expect('actual').toNotEqual('expected')
  })

  it('works with objects that do not have the same keys', () => {
    const a = { a: 'a', b: 'b', c: 'c' }
    const b = { a: 'a', b: 'b', d: 'c' }
    expect(a).toNotEqual(b)
  })

  it('works with objects that have different prototypes and different keys', () => {
    class A {
      constructor(prop) {
        this.a = prop
      }
    }

    class B {
      constructor(prop) {
        this.b = prop
      }
    }

    const a = new A('hi')
    const b = new B('hi')

    expect(a).toNotEqual(b)
  })

  it('works with arrays of objects', () => {
    const a = [
      {
        id: 0,
        text: 'Array Object 0',
        boo: false
      },
      {
        id: 1,
        text: 'Array Object 1',
        boo: false
      }
    ]

    const b = [
      {
        id: 0,
        text: 'Array Object 0',
        boo: true // value of boo is changed to true here
      },
      {
        id: 1,
        text: 'Array Object 1',
        boo: false
      }
    ]

    expect(a).toNotEqual(b)
  })

  if (typeof Map !== 'undefined') {
    it('works with Map', () => {
      const a = new Map()
      a.set('key', 'value')

      const b = new Map()
      b.set('key', 'another value')

      expect(a).toNotEqual(b)
    })
  }

  if (typeof Set !== 'undefined') {
    it('works with Set', () => {
      const a = new Set()
      a.add('a')

      const b = new Set()
      b.add('b')

      expect(a).toNotEqual(b)
    })
  }
})
