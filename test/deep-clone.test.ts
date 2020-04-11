import * as chai from 'chai'
import DeepCloner from "../src/deep-clone";

const assert = chai.assert

describe('Deep Clone', () => {
  it('should Deep Clone is Function', () => {
    assert.isFunction(DeepCloner)
  });

  it('should Deep Clone be possible to copy basic types', () => {
    const n = 123
    const s = '123'
    const b = false
    const u = undefined
    const empty = null
    const sym = Symbol()

    const n2 = new DeepCloner().clone(n)
    const s2 = new DeepCloner().clone(s)
    const b2 = new DeepCloner().clone(b)
    const u2 = new DeepCloner().clone(u)
    const empty2 = new DeepCloner().clone(empty)
    const sym2 = new DeepCloner().clone(sym)

    assert(n === n2)
    assert(s === s2)
    assert(b === b2)
    assert(u === u2)
    assert(empty === empty2)
    assert(sym === sym2)
  });

  describe('Object', () => {
    it('should be copy Ordinary object', () => {
      const a = {name: '123', child: {name: '546'}}
      const a2 = new DeepCloner().clone(a)
      assert(a !== a2)
      assert(a.name === a2.name)
      assert(a.child !== a2.child)
      assert(a.child.name === a2.child.name)
      assert.deepEqual(a, a2)
    });
    it('should be copy Array object', () => {
      const a = [[1, 2, 3], 4, 5]
      const a2 = new DeepCloner().clone(a)
      assert(a !== a2)
      assert(a[1] === a2[1])
      assert(a[0] !== a2[0])
      assert(a[0][1] === a2[0][1])
      assert.deepEqual(a, a2)
    });
    it('should be copy Function object', () => {
      const a = function () {
        return 1
      }
      a.xxx = {yyy: {zzz: 1}}
      const a2 = new DeepCloner().clone(a)
      assert(a !== a2)
      assert(a.xxx !== a2.xxx)
      assert(a.xxx.yyy !== a2.xxx.yyy)
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
      assert(a() === a2())
    });
    it('should be copy loop object', () => {
      const a = {name: 'xxx'}
      //@ts-ignore
      a.self = a
      const a2 = new DeepCloner().clone(a)

      assert(a.name === a2.name)
      //@ts-ignore
      assert(a.self !== a2.self)
    });
    it('should be copy date object', () => {
      const a = new Date()
      //@ts-ignore
      a.xxx = {yyy: {zzz: 1}}
      const a2 = new DeepCloner().clone(a)
      assert(a !== a2)
      assert(a.getTime() === a2.getTime())
      //@ts-ignore
      assert(a.xxx !== a2.xxx)
      //@ts-ignore
      assert(a.xxx.yyy !== a2.xxx.yyy)
      //@ts-ignore
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
    });
    it('should be copy RegExp object', () => {
      const a = /hi+/gi
      //@ts-ignore
      a.xxx = {yyy: {zzz: 1}}
      const a2 = new DeepCloner().clone(a)
      assert(a !== a2)
      assert(a.source === a.source)
      assert(a.flags === a.flags)
      //@ts-ignore
      assert(a.xxx !== a2.xxx)
      //@ts-ignore
      assert(a.xxx.yyy !== a2.xxx.yyy)
      //@ts-ignore
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
    });
    it('should be Auto-skipping prototype properties', () => {
      const a = Object.create({name: 'test'})
      a.xxx = {yyy: {zzz: 1}}
      const a2 = new DeepCloner().clone(a)
      assert(a !== a2)
      assert.isFalse('name' in a2)
      //@ts-ignore
      assert(a.xxx !== a2.xxx)
      //@ts-ignore
      assert(a.xxx.yyy !== a2.xxx.yyy)
      //@ts-ignore
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
    });
    it('should be possible to copy very complex objects', () => {
      const a = {
        n: NaN,
        n2: Infinity,
        s: "",
        bool: false,
        null: null,
        u: undefined,
        sym: Symbol(),
        o: {
          n: NaN,
          n2: Infinity,
          s: "",
          bool: false,
          null: null,
          u: undefined,
          sym: Symbol()
        },
        array: [
          {
            n: NaN,
            n2: Infinity,
            s: "",
            bool: false,
            null: null,
            u: undefined,
            sym: Symbol()
          }
        ],
        self: null
      };
      a.self = a
      const a2 = new DeepCloner().clone(a);
      assert(a !== a2);
      assert.isNaN(a2.n);
      assert(a.n2 === a2.n2);
      assert(a.s === a2.s);
      assert(a.bool === a2.bool);
      assert(a.null === a2.null);
      assert(a.u === a2.u);
      assert(a.sym === a2.sym);
      assert(a.o !== a2.o);
      assert.isNaN(a2.o.n);
      assert(a.o.n2 === a2.o.n2);
      assert(a.o.s === a2.o.s);
      assert(a.o.bool === a2.o.bool);
      assert(a.o.null === a2.o.null);
      assert(a.o.u === a2.o.u);
      assert(a.o.sym === a2.o.sym);
      assert(a.array !== a2.array);
      assert(a.array[0] !== a2.array[0]);
      assert.isNaN(a2.array[0].n);
      assert(a.array[0].n2 === a2.array[0].n2);
      assert(a.array[0].s === a2.array[0].s);
      assert(a.array[0].bool === a2.array[0].bool);
      assert(a.array[0].null === a2.array[0].null);
      assert(a.array[0].u === a2.array[0].u);
      assert(a.array[0].sym === a2.array[0].sym);
      assert(a.self !== a2.self);
    });
  });
})
