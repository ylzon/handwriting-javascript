/**
 * 柯里化函数
 * @param fn
 * @param params
 */


const currify = (fn, params = []) =>
	(...args) =>
		params.length + args.length === fn.length
			? fn(...args, ...params)
      : currify(fn, [...args, ...params])

export default currify