[![build status](https://img.shields.io/travis/mjackson/expect.svg?style=flat-square)](https://travis-ci.org/mjackson/expect)
[![npm package](https://img.shields.io/npm/v/expect.svg?style=flat-square)](https://www.npmjs.org/package/expect)

[expect](https://github.com/mjackson/expect) lets you write better assertions.

When you use expect, you write assertions similarly to how you would say them, e.g. "I expect this value to be equal to 3" or "I expect this array to contain 3". When you write assertions in this way, you don't need to remember the order of actual and expected arguments to functions like `assert.equal`, which helps you write better tests.

### Installation

Using [npm](https://www.npmjs.org/):

    $ npm install expect

Then with a module bundler like webpack, use as you would anything else:

```js
// using an ES6 transpiler, like babel
import expect, { createSpy, spyOn, isSpy } from 'expect'

// not using an ES6 transpiler
var expect = require('expect')
var createSpy = expect.createSpy
var spyOn = expect.spyOn
var isSpy = expect.isSpy
```

There is a UMD build in the npm package in the `umd` directory. Use it like:

```js
var expect = require('expect/umd/expect.min')
```

### Assertions

##### expect(object).toExist([message])

Asserts the given `object` is truthy.

```js
expect('something truthy').toExist()
```

##### expect(object).toNotExist([message])

Asserts the given `object` is falsy.

```js
expect(null).toNotExist()
```

##### expect(object).toBe(value, [message])

Asserts that `object` is strictly equal to `value` using `===`.

##### expect(object).toNotBe(value, [message])

Asserts that `object` is not strictly equal to `value` using `===`.

##### expect(object).toEqual(value, [message])

Asserts that the given `object` equals `value` using [deep-equal](https://www.npmjs.com/package/deep-equal).

##### expect(object).toNotEqual(value, [message])

Asserts that the given `object` is not equal to `value` using [deep-equal](https://www.npmjs.com/package/deep-equal).

##### expect(block).toThrow([error], [message])

Asserts that the given `block` `throw`s an error. The `error` argument may be a constructor (to test using `instanceof`), or a string/`RegExp` to test against `error.message`.

```js
expect(function () {
  throw new Error('boom!')
}).toThrow(/boom/)
```

##### expect(block).withArgs(...args).toThrow([error], [message])

Asserts that the given `block` `throw`s an error when called with `args`. The `error` argument may be a constructor (to test using `instanceof`), or a string/`RegExp` to test against `error.message`.

```js
expect(function (check) {
  if (check === 'bad')
    throw new Error('boom!')
}).withArgs('bad').toThrow(/boom/)
```

##### expect(block).withContext(context).toThrow([error], [message])

Asserts that the given `block` `throw`s an error when called in the given `context`. The `error` argument may be a constructor (to test using `instanceof`), or a string/`RegExp` to test against `error.message`.

```js
expect(function () {
  if (this.check === 'bad')
    throw new Error('boom!')
}).withContext({ check: 'bad' }).toThrow(/boom/)
```

##### expect(block).toNotThrow([message])

Asserts that the given `block` does not `throw`.

##### expect(object).toBeA(constructor, [message])
##### expect(object).toBeAn(constructor, [message])

Asserts the given `object` is an `instanceof constructor`.

```js
expect(new User).toBeA(User)
expect(new Asset).toBeAn(Asset)
```

##### expect(object).toBeA(string, [message])

Asserts the `typeof` the given `object` is `string`.

```js
expect(2).toBeA('number')
```

##### expect(object).toNotBeA(constructor, [message])
##### expect(object).toNotBeAn(constructor, [message])

Asserts the given `object` is *not* an `instanceof constructor`.

```js
expect(new User).toBeA(User)
expect(new Asset).toBeAn(Asset)
```

##### expect(object).toNotBeA(string, [message])

Asserts the `typeof` the given `object` is *not* `string`.

```js
expect(2).toBeA('number')
```

##### expect(string).toMatch(pattern, [message])

Asserts the given `string` matches `pattern`, which must be a `RegExp`.

```js
expect('a string').toMatch(/string/)
```

##### expect(number).toBeLessThan(value, [message])
##### expect(number).toBeFewerThan(value, [message])

Asserts the given `number` is less than `value`.

```js
expect(2).toBeLessThan(3)
```

##### expect(number).toBeGreaterThan(value, [message])
##### expect(number).toBeMoreThan(value, [message])

Asserts the given `number` is greater than `value`.

```js
expect(3).toBeGreaterThan(2)
```

##### expect(array).toInclude(value, [comparator], [message])
##### expect(array).toContain(value, [comparator], [message])

Asserts the given `array` contains `value`. The `comparator` function, if given, should compare two objects and either `return false` or `throw` if they are not equal. It defaults to `assert.deepEqual`.

```js
expect([ 1, 2, 3 ]).toInclude(3)
```

##### expect(array).toExclude(value, [comparator], [message])
##### expect(array).toNotContain(value, [comparator], [message])

Asserts the given `array` does not contain `value`. The `comparator` function, if given, should compare two objects and either `return false` or `throw` if they are not equal. It defaults to `assert.deepEqual`.

```js
expect([ 1, 2, 3 ]).toExclude(4)
```

##### expect(string).toInclude(value, [message])
##### expect(string).toContain(value, [message])

Asserts the given `string` contains `value`.

```js
expect('hello world').toInclude('world')
expect('hello world').toContain('world')
```

##### expect(string).toExclude(value, [message])
##### expect(string).toNotContain(value, [message])

Asserts the given `string` does not contain `value`.

```js
expect('hello world').toExclude('goodbye')
expect('hello world').toNotContain('goodbye')
```

### Chaining Assertions

Every assertion returns an `Expectation` object, so you can chain assertions together.

```js
expect(3.14)
  .toExist()
  .toBeLessThan(4)
  .toBeGreaterThan(3)
```

### Spies

expect also includes the ability to create spy functions that can track the calls that are made to other functions and make various assertions based on the arguments and context that were used.

```js
var video = {
  play: function () {},
  pause: function () {},
  rewind: function () {}
}

var spy = expect.spyOn(video, 'play')

video.play('some', 'args')

expect(spy.calls.length).toEqual(1)
expect(spy.calls[0].context).toBe(video)
expect(spy.calls[0].arguments).toEqual([ 'some', 'args' ])
expect(spy).toHaveBeenCalled()
expect(spy).toHaveBeenCalledWith('some', 'args')
```

### Issues

Please file issues on the [issue tracker on GitHub](https://github.com/mjackson/expect/issues).

### Tests

To run the tests in node:

    $ npm install
    $ npm test

To run the tests in Chrome:

    $ npm install
    $ npm run test-browser

### License

[MIT](http://opensource.org/licenses/MIT)
