import expect from '../index'

describe('expect(string).toNotMatch', () => {
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

describe('expect(object).toNotMatch', () => {
  it('does not throw when the actual value does not match the pattern', () => {
    expect(() => {
      expect({
        statusCode: 200,
        headers: {
          server: 'nginx web server'
        }
      }).toNotMatch({
        statusCode: 200,
        headers: {
          server: /express/
        }
      })
    }).toNotThrow()
  })

  it('throws when the actual value matches the pattern', () => {
    expect(() => {
      expect({
        statusCode: 200,
        headers: {
          server: 'express web server'
        }
      }).toNotMatch({
        statusCode: 200,
        headers: {
          server: /express/
        }
      })
    }).toThrow(/to not match/)
  })
})
