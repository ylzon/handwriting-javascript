import * as chai from 'chai'
import bind from '../src/bind'


const assert = chai.assert

describe('Bind', () => {
  it('should Bind is Function', () => {
    assert(bind instanceof Function)
  });
  it('should function bind exist', () => {
    (Function as any).prototype.bind2 = bind
    assert((Function as any).prototype.bind2 !== undefined)
  });
  it('should bind this success', () => {
    (Function as any).prototype.bind2 = bind
    function fn() {
      return this
    }
    // @ts-ignore
    const newFn = fn.bind2({name: 'test'})
    assert(newFn().name === 'test')
  });
  it('should bind multiple parameters', () => {
    (Function as any).prototype.bind2 = bind
    function fn(p1, p2) {
      return [this, p1, p2]
    }
    // @ts-ignore
    const newFn = fn.bind2({name: 'test'}, '123', '456')
    assert(newFn()[0].name === 'test')
    assert(newFn()[1] === '123')
    assert(newFn()[2] === '456')
  });
  it('should Pass the second parameter after the first parameter is bound successfully', () => {
    (Function as any).prototype.bind2 = bind
    function fn(p1, p2) {
      return [this, p1, p2]
    }
    // @ts-ignore
    const newFn = fn.bind2({name: 'test'}, '456')
    assert(newFn('789')[0].name === 'test')
    assert(newFn('789')[1] === '456')
    assert(newFn('789')[2] === '789')
  });
  it('should bind parameters when new', () => {
    (Function as any).prototype.bind2 = bind
    function fn(p1, p2) {
      this.p1 = p1
      this.p2 = p2
    }
    // @ts-ignore
    const newFn = fn.bind2(undefined, 'x', 'y')
    const object = new newFn()
    assert(object.p1 === 'x')
    assert(object.p2 === 'y')
  });
  it('should bind parameters when new and fn has a prototype', () => {
    (Function as any).prototype.bind2 = bind
    function fn(p1, p2) {
      this.p1 = p1
      this.p2 = p2
    }
    fn.prototype.test = 'test'
    // @ts-ignore
    const newFn = fn.bind2(undefined, 'x', 'y')
    const object = new newFn()
    assert(object.p1 === 'x')
    assert(object.p2 === 'y')
    assert(fn.prototype.isPrototypeOf(object))
    assert(object.test === 'test')
  });
  it('should bind no new but with a similar object', () => {
    (Function as any).prototype.bind2 = bind
    function fn(p1, p2) {
      this.p1 = p1
      this.p2 = p2
    }
    fn.prototype.test = 'test'
    const object1 = new fn('a', 'b')
    // @ts-ignore
    const newFn = fn.bind2(object1, 'x', 'y')
    const object = newFn()
    assert(object === undefined)
    assert(object1.p1 === 'x')
    assert(object1.p2 === 'y')
  });
})
