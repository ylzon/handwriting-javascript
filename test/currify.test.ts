import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import currify from "../src/currify";

chai.use(sinonChai)
const assert = chai.assert

describe('Currify', () => {
  it('should Currify is Function', function () {
    assert(currify instanceof Function)
  });
  it('should Currify accept single parameter', function () {
    const add = (a, b, c) => a + b + c
    const currifyAdd = currify(add)
    const value = currifyAdd(1)(2)(3)
    assert(value === 6)
  });
  it('should Currify accept multiple parameters', function () {
    const add = (a, b, c) => a + b + c
    const currifyAdd = currify(add)
    const value = currifyAdd(1,2)(3)
    assert(value === 6)
  });
})
