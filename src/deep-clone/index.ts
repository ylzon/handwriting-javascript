/***
 * 深克隆
 */
class DeepCloner {
  private cache = []

  clone(source) {
    if (source instanceof Object) {
      const cacheDist = this.getCache(source)
      if (cacheDist) {
        return cacheDist
      } else {
        let dist;
        if (source instanceof Array) {
          dist = new Array()
        } else if (source instanceof Function) {
          dist = function () {
            return source.apply(this, arguments)
          }
        } else if (source instanceof Date) {
          dist = new Date(source)
        } else if (source instanceof RegExp) {
          dist = new RegExp(source.source, source.flags)
        } else {
          dist = new Object()
        }
        this.cache.push([source, dist])
        for (let key in source) {
          if (source.hasOwnProperty(key)) {
            dist[key] = this.clone(source[key])
          }
        }
        return dist
      }
    }
    return source
  }

  private getCache(source) {
    for (let i = 0; i < this.cache.length; i++) {
      if (this.cache[i][0] === source) {
        return this.cache[i][1]
      }
    }
    return undefined
  }
}

export default DeepCloner