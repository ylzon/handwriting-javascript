import EventBus from "../src/enent-bus";
const eventHub = new EventBus();
type testCase = (message: string) => void

const test1:testCase = (message) => {
  console.assert(eventHub instanceof Object === true, 'EventHub is Object')
  console.log(message)
}

const test2:testCase = (message) => {
  let called:boolean = false
  eventHub.on('test1', (params:string) => {
    called = true
    console.assert(params === 'xxx', '方法被调用，传入的参数是：')
  });
  eventHub.emit('test1', 'xxx')
  // @ts-ignore
  console.assert(called === true, 'function is be called')
  console.log(message)
}

const test3:testCase = (message) => {
  let called:boolean = false
  const fn = (params: string) => {
    called = true
    console.assert(params === 'xxx', '方法被调用，传入的参数是：')
  }
  eventHub.on('test2',fn)
  eventHub.off('test2', fn)
  eventHub.emit('test2', 'xxx')
  // @ts-ignore
  console.assert(called === false, 'function is not be called')
  console.log(message)
}

test1('EventHub是对象')
test2('.emit 可以触发')
test3('.off 可以触发')
