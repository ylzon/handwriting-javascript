/**
 * 发布订阅模式
 */

export default class EventBus {
  private cache: { [key: string]: Array<( data?:unknown ) => void> } = {}

  on(eventName:string, fn: (data?:unknown) => void){
    this.cache[eventName] = this.cache[eventName] || []
    this.cache[eventName].push(fn)
  }
  emit(eventName:string, data?: unknown){
    (this.cache[eventName] || []).forEach((fn: (data?:unknown)=>void) => fn(data))
  }
  off(eventName:string, fn: (data?:unknown) => void){
    let index: number = indexOf(this.cache[eventName], fn)
    if(index === -1) return
    this.cache[eventName].splice(index, 1)
  }
}

/**
 * 等价于Array.prototype.indexOf
 * @param array
 * @param item
 */
function indexOf(array: Array<unknown>, item) {
  if (array === undefined) return -1
  let index:number = -1
  for (let i:number = 0; i < array.length; i ++ ){
    if (array[i] === item) {
      index = i
    }
  }
  return  index
}

