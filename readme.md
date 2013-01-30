
Defined Args
============

[![Build Status](https://secure.travis-ci.org/sorensen/defined-args.png)](http://travis-ci.org/sorensen/defined-args) 

A small utility for grabing arguments of a specified type.

Inspired from [tblobaum](https://github.com/tblobaum)'s [rconsole](https://github.com/tblobaum/rconsole)'s [defined](https://github.com/tblobaum/rconsole/blob/master/rconsole.js#L312-L316) method

Usage
-----

Node.js

``` js
var da = require('da')
```

Browser

``` html
<script src="da.js"></script>
```

Methods
-------

In all methods, `type`, can be matched against the following built in types: `null`, `undefined`, `boolean`, `array`, `function`, `date`, `regexp`, `number`, `string`, and `object`. The param is not case sensitive.

### first(type, …)

Returns the first argument of the specified type

``` js
da.first('string', 1, 2, 'a', 'b') // 'a'
da.first.number('a', 'b', 1, 2) // 1
```

### last(type, …)

Returns the last argument of the specified type

``` js
da.last('object', 1, null, 'a', {foo: 'bar'}, {}) // {foo: 'bar'}
da.last.boolean(1, 2, true, false) // false
```

### not(type, …) 

Returns the first type that does not match the specified type

``` js
da.not('number', 1, 2, 'a', 3) // 'a'
da.not.array([1], [2, 3], undefined, [4]) // undefined
```

Aliases
-------

All top level methods, (`first`, `last`, `not`), have an alias to the built in types checked against.

* `method.null`
* `method.string`
* `method.undefined`
* `method.number`
* `method.function`
* `method.boolean`
* `method.date`
* `method.regexp`
* `method.object`
* `method.array`

Install
-------

With [npm](https://npmjs.org)

```
npm install da
```

