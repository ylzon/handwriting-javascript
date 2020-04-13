# 手写JavaScript常见代码
手写 currify / promise / bind / Deep copy / EventHub

## TodoList
* [x] [Currify](https://github.com/ylzon/handwriting-javascript/blob/master/src/currify/index.ts)
* [x] [EventHub](https://github.com/ylzon/handwriting-javascript/blob/master/src/enent-bus/index.ts)
* [x] [DeepCopy](https://github.com/ylzon/handwriting-javascript/blob/master/src/deep-clone/index.ts)
* [x] [bind](https://github.com/ylzon/handwriting-javascript/blob/master/src/bind/index.ts)
* [ ] Promise/A+

## Install

```shell
npm install
```

## Test

```shell
npm run test
```

```
  Bind
    ✓ should Bind is Function
    ✓ should function bind exist
    ✓ should bind this success
    ✓ should bind multiple parameters
    ✓ should Pass the second parameter after the first parameter is bound successfully
    ✓ should bind parameters when new
    ✓ should bind parameters when new and fn has a prototype
    ✓ should bind no new but with a similar object

  Currify
    ✓ should Currify is Function
    ✓ should Currify accept single parameter
    ✓ should Currify accept multiple parameters

  Deep Clone
    ✓ should Deep Clone is Function
    ✓ should Deep Clone be possible to copy basic types
    Object
      ✓ should be copy Ordinary object
      ✓ should be copy Array object
      ✓ should be copy Function object
      ✓ should be copy loop object
      ✓ should be copy date object
      ✓ should be copy RegExp object
      ✓ should be Auto-skipping prototype properties
      ✓ should be possible to copy very complex objects

  EvanHub
    ✓ should EvenHub is Object
    ✓ should .emit have be work
    ✓ should .emit can pass parameters
    ✓ should .off have be work
```

## LICENSE
[MIT](LICENSE)


