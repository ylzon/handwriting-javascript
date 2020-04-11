import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import EventBus from "../src/enent-bus";

chai.use(sinonChai)
const assert = chai.assert

describe('Bind', () => {
  it('should EvenHub is Object', function () {
    const eventHub = new EventBus();
    assert(eventHub instanceof Object)
  });
  it('should .emit have be work', function () {
    const fn = sinon.fake()

    const eventHub = new EventBus();
    eventHub.on('test1', fn);
    eventHub.emit('test1')
    assert(fn.called)
  });
})
