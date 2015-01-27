[![npm package](https://img.shields.io/npm/v/expect.svg?style=flat-square)](https://www.npmjs.org/package/expect)
[![build status](https://img.shields.io/travis/mjackson/expect.svg?style=flat-square)](https://travis-ci.org/mjackson/expect)
[![dependency status](https://img.shields.io/david/mjackson/expect.svg?style=flat-square)](https://david-dm.org/mjackson/expect)
[![code climate](https://img.shields.io/codeclimate/github/mjackson/expect.svg?style=flat-square)](https://codeclimate.com/github/mjackson/expect)

[expect](https://github.com/mjackson/expect) is a thin wrapper around node's [assert](http://nodejs.org/api/assert.html) module that lets you write better assertions.

When you use expect, you write assertions similarly to how you would say them, e.g. "I expect this value to be equal to 3" or "I expect this array to contain 3". When you write assertions in this way, you don't need to remember the order of actual and expected arguments to functions like `assert.equal`, which helps you write better tests.

### Usage

##### expect(object).toBe(value, [message])

Asserts that `object` is strictly equal to `value` using [assert.strictEqual](http://nodejs.org/api/assert.html#assert_assert_strictequal_actual_expected_message).

##### expect(object).toNotBe(value, [message])

Asserts that `object` is not strictly equal to `value` using [assert.notStrictEqual](http://nodejs.org/api/assert.html#assert_assert_notstrictequal_actual_expected_message).

##### expect(object).toEqual(value, [message])

Asserts that the given `object` equals `value` using [assert.equal](http://nodejs.org/api/assert.html#assert_assert_equal_actual_expected_message).

##### expect(object).toNotEqual(value, [message])

Asserts that the given `object` is not equal to `value` using [assert.notEqual](http://nodejs.org/api/assert.html#assert_assert_notequal_actual_expected_message).

##### expect(block).toThrow([error], [message])

Asserts that the given `block` throws an error using [assert.throws](http://nodejs.org/api/assert.html#assert_assert_throws_block_error_message). The `error` argument may be a constructor, `RegExp`, or validation function.

```js
expect(function () {
  throw new Error('boom!');
}).toThrow(/boom/);
```

##### expect(block).toNotThrow([message])

Asserts that the given `block` does not throw using [assert.doesNotThrow](http://nodejs.org/api/assert.html#assert_assert_doesnotthrow_block_message).

##### expect(object).toExist([message])

Asserts the given `object` is truthy.

```js
expect('something truthy').toExist();
```

##### expect(object).toNotExist([message])

Asserts the given `object` is falsy.

```js
expect(null).toNotExist();
```

##### expect(object).toBeA(constructor, [message])
##### expect(object).toBeAn(constructor, [message])

Asserts the given `object` is an `instanceof constructor`.

```js
expect(new User).toBeA(User);
expect(new Asset).toBeAn(Asset);
```

##### expect(object).toBeA(string, [message])

Asserts the `typeof` the given `object` is `string`.

```js
expect(2).toBeA('number');
```

##### expect(string).toMatch(pattern, [message])

Asserts the given `string` matches `pattern`, which must be a `RegExp`.

```js
expect('a string').toMatch(/string/);
```

##### expect(number).toBeLessThan(value, [message])
##### expect(number).toBeFewerThan(value, [message])

Asserts the given `number` is less than `value`.

```js
expect(2).toBeLessThan(3);
```

##### expect(number).toBeGreaterThan(value, [message])
##### expect(number).toBeMoreThan(value, [message])

Asserts the given `number` is greater than `value`.

```js
expect(3).toBeGreaterThan(2);
```

##### expect(array).toInclude(value, [comparator], [message])
##### expect(array).toContain(value, [comparator], [message])

Asserts the given `array` contains `value`. The `comparator` function, if given, should compare two objects and either `return false` or `throw` if they are not equal. It defaults to `assert.deepEqual`.

```js
expect([ 1, 2, 3 ]).toInclude(3);
```

##### expect(array).toExclude(value, [comparator], [message])
##### expect(array).toNotContain(value, [comparator], [message])

Asserts the given `array` does not contain `value`. The `comparator` function, if given, should compare two objects and either `return false` or `throw` if they are not equal. It defaults to `assert.deepEqual`.

```js
expect([ 1, 2, 3 ]).toExclude(4);
```

##### expect(string).toInclude(value, [message])
##### expect(string).toContain(value, [message])

Asserts the given `string` contains `value`.

```js
expect('hello world').toInclude('world');
expect('hello world').toContain('world');
```

##### expect(string).toExclude(value, [message])
##### expect(string).toNotContain(value, [message])

Asserts the given `string` does not contain `value`.

```js
expect('hello world').toExclude('goodbye');
expect('hello world').toNotContain('goodbye');
```

### Spies

expect.js also includes the ability to create spy functions that can track the calls that are made to other functions and make various assertions based on the arguments and context that were used.

```js
var video = {
  play: function () {},
  pause: function () {},
  rewind: function () {}
};

var spy = expect.spyOn(video, 'play');

video.play('some', 'args');

expect(spy.calls.length).toEqual(1);
expect(spy.calls[0].context).toBe(video);
expect(spy.calls[0].arguments).toEqual([ 'some', 'args' ]);
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledWith('some', 'args');
```

### Chaining Assertions

Every assertion returns an `Expectation` object, so you can chain assertions together.

```js
expect(3.14)
  .toExist()
  .toBeLessThan(4)
  .toBeGreaterThan(3);
```

### Installation

Using [npm](https://www.npmjs.org/):

    $ npm install expect

Or, include `dist/expect.min.js` in your page using a `<script>` tag:

```html
<script src="expect.min.js"></script>
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
