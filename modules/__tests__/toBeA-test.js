import expect from '../index'
import Expectation from '../Expectation'

describe('toBeA', () => {
  it('requires the value to be a function or string', () => {
    expect(() => {
      expect('actual').toBeA(4)
    }).toThrow(/must be a function or a string/)
  })

  it('does not throw when the actual value is an instanceof the constructor', () => {
    expect(() => {
      expect(new Expectation).toBeA(Expectation)
    }).toNotThrow()
  })

  it('throws when the actual value is not an instanceof the constructor', () => {
    expect(() => {
      expect('actual').toBeA(Expectation)
    }).toThrow(/to be/)
  })

  it('does not throw when the expected value is the typeof the actual value', () => {
    expect(() => {
      expect(4).toBeA('number')
      expect(NaN).toBeA('number') // hahaha
    }).toNotThrow()
  })

  it('throws when the expected value is not the typeof the actual value', () => {
    expect(() => {
      expect('actual').toBeA('number')
    }).toThrow(/to be/)
  })

  it('does not throw when the actual value is an array', () => {
    expect(() => {
      expect([]).toBeAn('array')
    }).toNotThrow()
  })

  it('throws when the actual value is not an array', () => {
    expect(() => {
      expect('actual').toBeAn('array')
    }).toThrow(/to be/)
  })
})
