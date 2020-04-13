/**
 * bind
 * @param args
 */
function bind(...args) {
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