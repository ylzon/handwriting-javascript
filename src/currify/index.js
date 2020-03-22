// 支持单/多参数
const add = (a, b, c) => a + b + c
const currifyAdd = currify(add)
currifyAdd(1,2)(3)
currifyAdd(1)(2)(3)

// ES6
const currify = (fn, params = []) =>
	(...args) => 
		params.length + args.length === fn.length
			? fn(...args, ...params)
      : currify(fn, [...args, ...params])
      

// ES5
function currifyES5 (fn, paramsArg) {
  var params = paramsArg || []
  return function() {
    var args = arguments
    return params.length + args.length === fn.length
        ? fn(...args, ...params)
        : currify(fn, [...params, ...args])
  }
}

export default currify