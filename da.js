/**
 * (c) 2012 Beau Sorensen
 * MIT Licensed
 * For all details and documentation:
 * https://github.com/sorensen/defined-args
 */

;(function() {
'use strict';

/*!
 * Module dependencies.
 */

var root = this
  , da = typeof exports !== 'undefined' ? exports : root.da = {}
  , toString = Object.prototype.toString
  , slice = Array.prototype.slice
  , map = {
    number: '[object Number]'
  , object: '[object Object]'
  , array: '[object Array]'
  , string: '[object String]'
  , regexp: '[object RegExp]'
  , date: '[object Date]'
  , 'function': '[object Function]'
  , 'boolean': '[object Boolean]'
  , 'undefined': '[object Undefined]'
  , 'null': '[object Null]'
  }

/**
 * Current library version, should match `package.json`
 */

da.VERSION = '0.0.3'

/**
 * Find the first argument of a given type in an arguments list
 *
 * Example:
 *   
 *   first('string', undefined, null, 'a', 1, true, 'b') // returns 'a'
 *   first('boolean', undefined, true, 3, false) // returns true
 *
 * @param {String} Built in type
 * @param {...} Argument list
 */

da.first = function(type) {
  type = (type || '').toLowerCase()
  var args = slice.call(arguments, 1)
  for (var i = 0; i !== args.length; i++) {
    if (toString.call(args[i]) === map[type]) return args[i]
  }
}

/**
 * Find the last argument of a given type in an arguments list
 *
 * Example:
 *   
 *   last('string', undefined, null, 'a', 1, true, 'b') // returns 'b'
 *   last('boolean', undefined, true, 3, false) // returns false
 *
 * @param {String} Built in type
 * @param {...} Argument list
 */

da.last = function(type) {
  type = (type || '').toLowerCase()
  var args = slice.call(arguments, 1, arguments.length)
    , args = [type].concat(args.reverse())
  return da.first.apply(null, args)
}

/**
 * Find the first argument that is not of the given type
 *
 * Example:
 *
 *   not('number', 1, 2, 3, 'abc') // returns 'abc'
 *   not('string', 'a', 'b', 2) // returns 2
 *
 * @param {String} Built in type
 * @param {...} Argument list
 */

da.not = function(type) {
  type = (type || '').toLowerCase()
  var args = slice.call(arguments, 1)
  for (var i = 0; i !== args.length; i++) {
    if (toString.call(args[i]) !== map[type]) return args[i]
  }
}

/**
 * Iterate through all built in types and make a shortcut
 * method to retrieve the first/last argument of that type
 */

for (var type in map) (function(type) {
  for (var method in da) (function(method) {
    da[method][type] = function() {
      var args = [type].concat(slice.call(arguments, 0))
      return da[method].apply(null, args)
    }
  })(method)
})(type)

}).call(this);