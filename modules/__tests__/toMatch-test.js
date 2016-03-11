import expect from '../index'

describe('toMatch', () => {
  it('requires the pattern to be a RegExp', () => {
    expect(() => {
      expect('actual').toMatch('expected')
    }).toThrow(/must be a RegExp/)
  })

  it('does not throw when the actual value matches the pattern', () => {
    expect(() => {
      expect('actual').toMatch(/^actual$/)
    }).toNotThrow()
  })

  it('throws when the actual value does not match the pattern', () => {
    expect(() => {
      expect('actual').toMatch(/nope/)
    }).toThrow(/to match/)
  })
})

describe('toNotMatch', () => {
  it('requires the pattern to be a RegExp', () => {
    expect(() => {
      expect('actual').toNotMatch('expected')
    }).toThrow(/must be a RegExp/)
  })

  it('does not throw when the actual value does not match the pattern', () => {
    expect(() => {
      expect('actual').toNotMatch(/nope/)
    }).toNotThrow()
  })

  it('throws when the actual value matches the pattern', () => {
    expect(() => {
      expect('actual').toNotMatch(/^actual$/)
    }).toThrow(/to not match/)
  })
})
