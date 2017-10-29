import { db, Tree } from './keywords';
// import './setupTests';
it('keyword', () => {
  const tree = new Tree(db) as any;
  const i = 0;
  let n = 0;
  var iterable = {
    [Symbol.iterator]() {
      return {
        i: 0,
        next() {
          if (this.i < 3) {
            return { value: this.i++, done: false };
          }
          return { value: undefined, done: true };
        }
      };
    }
  } as any;
  // const it = tree[Symbol.iterator]();
  // let e = it.next();
  // while (!e.done) {
    // e = it.next();
  // }
  // expect(tree.length).toBe(2)
  for (let item of iterable) {
    console.log('\u2665  8', item);
    if (i === 0) {
      n = 1;
      expect(item.name).toEqual('es62');
    }
  }
  expect(n).toBe(1);
});
