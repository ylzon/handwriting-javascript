var slice = Array.prototype.slice;
/**
 * bind
 */
function bind(newThis) {
  var fn = this
  var args = slice.call(arguments,1)

  if (typeof fn !== 'function') {
    throw new TypeError('bind Must be called on the function.')
  }

  function resultFn() {
    var isNew = resultFn.prototype.isPrototypeOf(this)
    var args2 = slice.call(arguments, 0)
    return fn.apply(isNew ? this : newThis, args.concat(args2))
  }

  resultFn.prototype = fn.prototype
  return resultFn
}

// ES6
function _bind(...args) {
  const fn = this
  const newThis = args[0]
  function resultFn(...args2) {
    // const isNew = resultFn.prototype.isPrototypeOf(this)
    const isNew = this instanceof resultFn
    return fn.call(isNew ? this : newThis, ...args.slice(1), ...args2)
  }
  resultFn.prototype = fn.prototype
  return resultFn
}

// Polyfill
if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}

export default bind