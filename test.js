'use strict';

var da = require('./index')
  , assert = require('assert')
  , ase = assert.strictEqual
  , aok = assert.ok
  , ade = assert.deepEqual

/**
 * RegExp equality tester
 *
 * @param {RegExp}
 * @param {RegExp}
 */

function regexEqual(x, y) {
  return x instanceof RegExp
    && y instanceof RegExp 
    && x.source === y.source 
    && x.global === y.global 
    && x.ignoreCase === y.ignoreCase 
    && x.multiline === y.multiline
}

/**
 * `first` tests
 */

describe('First', function() {
  it('should get first string', function() {
    ase('a', da.first.string(3, true, null, /^\s+|\s+$/g, {}, 'a', 'b'))
    ase('b', da.first('string', 1, 2, 3, 'b', 'c', 33))
  })
  it('should get first number', function() {
    ase(1, da.first.number(null, 'a', 1, 2, 3, new Date()))
    ase(4, da.first('number', null, 'a', 4, 5, 6, 'meow'))
    ase(11, da.first.number('foo', '1', Number('11'), 20))
  })
  it('should get first object', function() {
    ade({}, da.first.object(null, 'foo', new Date(), {}, 'hi'), {a: 2})
    ade({hi: 'a'}, da.first('object', 1, 2, 3, new Date(), {hi: 'a'}, {}))
  })
  it('should get the first null', function() {
    ase(null, da.first.null(1, 2, 3, 'a', true, null, 3))
    ase(null, da.first('null', 3, 4, 'a', false, {}, null, 3))
  })
  it('should get the first undefined', function() {
    ase(undefined, da.first.undefined(1, 2, 3, 'a', undefined))
    ase(undefined, da.first('undefined', 'a', 3, 4, undefined, 'meow'))
  })
  it('should get the first array', function() {
    ade([1, 2], da.first('array', 1, 2, 'a', null, [1, 2], [3, 4]))
    ade([3], da.first.array('b', null, undefined, {}, [3], [4]))
    ade([4, 4], da.first.array('b', null, new Array(4, 4)))
  })
  it('should get the first date', function() {
    ase(new Date(1).getTime(), da.first('date', null, 'a', new Date(1)).getTime())
    ase(new Date(2).getTime(), da.first.date(1, 10, {}, new Date(2)).getTime())
  })
  it('should get the first function', function() {
    function meow() {}
    ase(meow, da.first('function', 1, 2, 'a', meow, null))
    ase(meow, da.first.function(1, 'a', null, meow, undefined))
  })
  it('should get the first boolean', function() {
    ase(true, da.first('boolean', 1, 2, null, true, false))
    ase(false, da.first.boolean(4, 'a', false, true))
  })
  it('should get the first regexp', function() {
    aok(regexEqual(/^s$/g, da.first('regexp', 1, 2, null, /^s$/g, true)))
    aok(regexEqual(new RegExp(/^s$/g), da.first.regexp(2, null, new RegExp(/^s$/g))))
  })
  it('should have all shortcut methods', function() {
    aok(da.first.number)
    aok(da.first.object)
    aok(da.first.array)
    aok(da.first.string)
    aok(da.first.regexp)
    aok(da.first.date)
    aok(da.first.function)
    aok(da.first.boolean)
    aok(da.first.undefined)
    aok(da.first.null)
  })
})

/**
 * `last` tests
 */

describe('Last', function() {
  it('should get last string', function() {
    ase('b', da.last.string(3, true, null, /^\s+|\s+$/g, {}, 'a', 'b'))
    ase('c', da.last('string', 1, 2, 3, 'b', 'c', 33))
  })
  it('should get last number', function() {
    ase(3, da.last.number(null, 'a', 1, 2, 3, true))
    ase(6, da.last('number', null, 'a', 4, 5, 6, {}))
    ase(10, da.last.number('foo', 1, Number('10')))
  })
  it('should get last object', function() {
    ade({}, da.last.object(null, {a: 2}, {foo: 'bar'}, {}, 3))
    ade({a: 3}, da.last('object', new Date(), null, 1, 2, 3, {f: 'b'}, {a: 3}))
  })
  it('should get the last null', function() {
    ase(null, da.last.null(1, 2, 3, null))
    ase(null, da.last('null', 1, 3, 4, null))
  })
  it('should get the last undefined', function() {
    ase(undefined, da.last.undefined(1, 3, 4, undefined))
    ase(undefined, da.last('undefined', 3, 4, 'a', undefined))
  })
  it('should get the last array', function() {
    ade([1, 2], da.last('array', 1, 'a', null, [2, 3], [1, 2], null))
    ade([3], da.last.array(1, [1], [2], {}, 'foo', [3], 'h'))
  })
  it('should get the last date', function() {
    ase(new Date(2010).getTime(), da.last.date(new Date(10), new Date(2010)).getTime())
  })
  it('should get the last function', function() {
    function meow() {}
    function bark() {}
    ase(meow, da.last.function(null, bark, bark, 1, meow, 3))
  })
  it('should get the last boolean', function() {
    ase(true, da.last('boolean', 1, false, true))
    ase(false, da.last.boolean(1, true, true, false, 'hi'))
  })
  it('should get the last regexp', function() {
    aok(regexEqual(/a/, da.last.regexp(1, 2, null, /^\s+/, /a/)))
  })
  it('should have all shortcut methods', function() {
    aok(da.last.number)
    aok(da.last.object)
    aok(da.last.array)
    aok(da.last.string)
    aok(da.last.regexp)
    aok(da.last.date)
    aok(da.last.function)
    aok(da.last.boolean)
    aok(da.last.undefined)
    aok(da.last.null)
  })
})

/**
 * `not` tests
 */

describe('Not', function() {
  it('should get the first non string', function() {
    ase(2, da.not.string('a', 'b', 'c', 2, 'd'))
  })
  it('should get the first non number', function() {
    ase('a', da.not.number(1, 2, 3, 4, 'a', 5))
  })
  it('should get the first non object', function() {
    ase(5, da.not.object({}, {}, 5, {}))
  })
  it('should get the first non null', function() {
    ase(6, da.not.null(null, null, 6, null))
  })
  it('should get the first non undefined', function() {
    ase(7, da.not.undefined(undefined, undefined, 7, undefined))
  })
  it('should get the first non array', function() {
    ase(8, da.not.array([], [1], [2], 8, [4]))
  })
  it('should get the first non date', function() {
    ase(9, da.not.date(new Date(), new Date(), 9, new Date()))
  })
  it('should get the first non function', function() {
    function meow() {}
    ase(10, da.not.function(meow, function() {}, meow, 10, meow))
  })
  it('should get the first non boolean', function() {
    ase(1, da.not.boolean(true, false, true, 1, false))
  })
  it('should get the first non regexp', function() {
    var reg = /a/
    ase(2, da.not.regexp(reg, reg, 2, reg))
  })
  it('should have all shortcut methods', function() {
    aok(da.not.number)
    aok(da.not.object)
    aok(da.not.array)
    aok(da.not.string)
    aok(da.not.regexp)
    aok(da.not.date)
    aok(da.not.function)
    aok(da.not.boolean)
    aok(da.not.undefined)
    aok(da.not.null)
  })
})
