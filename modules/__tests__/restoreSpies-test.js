import expect, { createSpy, spyOn, restoreSpies } from '../index'

describe('restoreSpies', () => {
  describe('with one spy', () => {
    const original = () => {}
    const target = { method: original }

    beforeEach(() => {
      spyOn(target, 'method')
    })

    it('works with spyOn()', () => {
      expect(target.method).toNotEqual(original)
      restoreSpies()
      expect(target.method).toEqual(original)
    })

    it('is idempotent', () => {
      expect(target.method).toNotEqual(original)
      restoreSpies()
      restoreSpies()
      expect(target.method).toEqual(original)
    })

    it('can work even on createSpy()', () => {
      createSpy(original)
      restoreSpies()
    })
  })

  describe('with multiple spies', () => {
    const originals = [ () => {}, () => {} ]
    const targets = [
      { method: originals[0] },
      { method: originals[1] }
    ]

    it('still works', () => {
      spyOn(targets[0], 'method')
      spyOn(targets[1], 'method')

      expect(targets[0].method).toNotEqual(originals[0])
      expect(targets[1].method).toNotEqual(originals[1])

      restoreSpies()

      expect(targets[0].method).toEqual(originals[0])
      expect(targets[1].method).toEqual(originals[1])
    })
  })
})
