## HEAD

- [#29] - Show object diffs using toEqual() in Mocha
- Add `expect.restoreSpies()`

[#29]: https://github.com/mjackson/expect/issues/29

## [v1.11.1]
> Sep 26, 2015

- [#12] - Add `spy#destroy()` method

[#12]: https://github.com/mjackson/expect/issues/12
[v1.11.1]: https://github.com/mjackson/expect/compare/v1.11.0...v1.11.1

## [v1.11.0]
> Sep 12, 2015

- Add `expect.isSpy()`
- Significant internal refactoring to use ES6 classes and the Babel transpiler

[v1.11.0]: https://github.com/mjackson/expect/compare/v1.10.0...v1.11.0

## [v1.10.0]
> Sep 3, 2015

- Add `expect(spy).toNotHaveBeenCalled()`
- Add `expect(obj).toBeAn('array')`
- Add `expect(str).toNotMatch(regexp)`
- Use [invariant](https://www.npmjs.com/package/invariant) instead of `assert` where applicable
- Improve expectation error messages
- Internal: use [eslint](https://www.npmjs.com/package/eslint) for linting

[v1.10.0]: https://github.com/mjackson/expect/compare/v1.9.0...v1.10.0
